import { headers } from "next/headers";
import net from "node:net";
import tls from "node:tls";

type WindowCounter = {
  count: number;
  resetAt: number;
};

type RateLimitResult = {
  allowed: boolean;
  retryAfterSeconds: number;
};

const loginIpStore = new Map<string, WindowCounter>();
const loginEmailStore = new Map<string, WindowCounter>();
const registerIpStore = new Map<string, WindowCounter>();

const LOGIN_IP_LIMIT = { max: 20, windowMs: 10 * 60 * 1000 };
const LOGIN_EMAIL_LIMIT = { max: 10, windowMs: 10 * 60 * 1000 };
const REGISTER_IP_LIMIT = { max: 10, windowMs: 60 * 60 * 1000 };

function getRedisUrl(): string | null {
  const value = process.env.REDIS_URL?.trim();
  return value || null;
}

function getAllowedOriginHosts(): Set<string> {
  const fromEnv = (process.env.AUTH_ALLOWED_ORIGINS || process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  const hosts = fromEnv
    .map((value) => {
      try {
        return new URL(value).host.toLowerCase();
      } catch {
        return value.toLowerCase();
      }
    })
    .filter(Boolean);

  return new Set(hosts);
}

function consumeWindowMemory(
  store: Map<string, WindowCounter>,
  key: string,
  limit: { max: number; windowMs: number },
): RateLimitResult {
  const now = Date.now();
  const existing = store.get(key);

  if (!existing || now >= existing.resetAt) {
    store.set(key, { count: 1, resetAt: now + limit.windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (existing.count >= limit.max) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  existing.count += 1;
  store.set(key, existing);
  return { allowed: true, retryAfterSeconds: 0 };
}

function cleanupStore(store: Map<string, WindowCounter>): void {
  const now = Date.now();
  for (const [key, value] of store.entries()) {
    if (now >= value.resetAt) {
      store.delete(key);
    }
  }
}

if (typeof setInterval !== "undefined") {
  setInterval(() => {
    cleanupStore(loginIpStore);
    cleanupStore(loginEmailStore);
    cleanupStore(registerIpStore);
  }, 5 * 60 * 1000);
}

function encodeRespCommand(args: string[]): string {
  const parts = [`*${args.length}`];
  for (const arg of args) {
    parts.push(`$${Buffer.byteLength(arg, "utf8")}`);
    parts.push(arg);
  }
  return `${parts.join("\r\n")}\r\n`;
}

function parseResp(data: string): { value: string | number | null; bytesRead: number } {
  const type = data[0];
  const lineEnd = data.indexOf("\r\n");
  if (lineEnd === -1) {
    throw new Error("Incomplete RESP response");
  }

  if (type === "+") {
    return { value: data.slice(1, lineEnd), bytesRead: lineEnd + 2 };
  }

  if (type === ":") {
    return { value: Number(data.slice(1, lineEnd)), bytesRead: lineEnd + 2 };
  }

  if (type === "$") {
    const size = Number(data.slice(1, lineEnd));
    if (size === -1) {
      return { value: null, bytesRead: lineEnd + 2 };
    }
    const start = lineEnd + 2;
    const end = start + size;
    if (data.length < end + 2) {
      throw new Error("Incomplete RESP bulk string");
    }
    return {
      value: data.slice(start, end),
      bytesRead: end + 2,
    };
  }

  if (type === "-") {
    throw new Error(data.slice(1, lineEnd));
  }

  throw new Error("Unsupported RESP response type");
}

async function redisCommand(args: string[]): Promise<string | number | null> {
  const redisUrl = getRedisUrl();
  if (!redisUrl) {
    throw new Error("REDIS_URL is not configured");
  }

  const url = new URL(redisUrl);
  const secure = url.protocol === "rediss:";
  const host = url.hostname;
  const port = Number(url.port || (secure ? 6380 : 6379));
  const username = decodeURIComponent(url.username || "");
  const password = decodeURIComponent(url.password || "");
  const dbIndex = url.pathname && url.pathname !== "/" ? Number(url.pathname.slice(1)) : 0;

  return await new Promise((resolve, reject) => {
    const socket = secure
      ? tls.connect({ host, port, servername: host })
      : net.connect({ host, port });

    let step = 0;
    let buffer = "";
    let settled = false;

    const fail = (error: Error) => {
      if (!settled) {
        settled = true;
        socket.destroy();
        reject(error);
      }
    };

    const send = (commandArgs: string[]) => {
      socket.write(encodeRespCommand(commandArgs));
    };

    const onReady = () => {
      if (password) {
        if (username) {
          send(["AUTH", username, password]);
        } else {
          send(["AUTH", password]);
        }
      } else if (dbIndex > 0) {
        send(["SELECT", String(dbIndex)]);
      } else {
        send(args);
        step = 2;
      }
    };

    socket.on("error", (error) => fail(error));
    socket.on(secure ? "secureConnect" : "connect", onReady);
    socket.on("data", (chunk) => {
      buffer += chunk.toString("utf8");

      try {
        while (buffer.length > 0) {
          const parsed = parseResp(buffer);
          buffer = buffer.slice(parsed.bytesRead);

          if (step === 0) {
            if (dbIndex > 0) {
              send(["SELECT", String(dbIndex)]);
              step = 1;
            } else {
              send(args);
              step = 2;
            }
            continue;
          }

          if (step === 1) {
            send(args);
            step = 2;
            continue;
          }

          if (step === 2) {
            if (!settled) {
              settled = true;
              socket.end();
              resolve(parsed.value);
            }
            return;
          }
        }
      } catch (error) {
        fail(error instanceof Error ? error : new Error("Invalid Redis response"));
      }
    });
  });
}

async function consumeWindowRedis(
  key: string,
  limit: { max: number; windowMs: number },
): Promise<RateLimitResult> {
  const windowSeconds = Math.ceil(limit.windowMs / 1000);
  const countResult = await redisCommand(["INCR", key]);
  const count = Number(countResult ?? 0);

  if (!Number.isFinite(count)) {
    throw new Error("Invalid Redis counter response");
  }

  if (count === 1) {
    await redisCommand(["EXPIRE", key, String(windowSeconds)]);
  }

  if (count > limit.max) {
    const ttlResult = await redisCommand(["TTL", key]);
    const ttl = Number(ttlResult ?? 0);
    return {
      allowed: false,
      retryAfterSeconds: ttl > 0 ? ttl : windowSeconds,
    };
  }

  return { allowed: true, retryAfterSeconds: 0 };
}

async function consumeWindow(
  store: Map<string, WindowCounter>,
  key: string,
  limit: { max: number; windowMs: number },
): Promise<RateLimitResult> {
  if (getRedisUrl()) {
    try {
      return await consumeWindowRedis(key, limit);
    } catch {
      // Falls back to in-memory locally or when Redis is temporarily unavailable.
    }
  }

  return consumeWindowMemory(store, key, limit);
}

export async function getRequestIp(): Promise<string> {
  const headersList = await headers();
  const forwardedFor = headersList.get("x-forwarded-for");
  const realIp = headersList.get("x-real-ip");
  return forwardedFor?.split(",")[0]?.trim() || realIp || "unknown";
}

export async function isValidAuthOrigin(): Promise<boolean> {
  const headersList = await headers();
  const origin = headersList.get("origin");
  const host = headersList.get("x-forwarded-host") || headersList.get("host");

  if (!origin) {
    return process.env.NODE_ENV !== "production";
  }

  if (!host) {
    return false;
  }

  let originHost: string;
  try {
    originHost = new URL(origin).host.toLowerCase();
  } catch {
    return false;
  }

  const normalizedHost = host.toLowerCase();
  if (originHost === normalizedHost) {
    return true;
  }

  return getAllowedOriginHosts().has(originHost);
}

export async function checkLoginRateLimit(ip: string, email: string): Promise<RateLimitResult> {
  const ipResult = await consumeWindow(loginIpStore, `rl:login:ip:${ip}`, LOGIN_IP_LIMIT);
  if (!ipResult.allowed) {
    return ipResult;
  }

  const emailResult = await consumeWindow(
    loginEmailStore,
    `rl:login:email:${email.toLowerCase()}`,
    LOGIN_EMAIL_LIMIT,
  );

  if (!emailResult.allowed) {
    return emailResult;
  }

  return { allowed: true, retryAfterSeconds: 0 };
}

export async function checkRegisterRateLimit(ip: string): Promise<RateLimitResult> {
  return await consumeWindow(registerIpStore, `rl:register:ip:${ip}`, REGISTER_IP_LIMIT);
}
