import "server-only";

import { randomBytes, createHash } from "node:crypto";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

const SESSION_COOKIE = "metzium_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days
const MAX_ACTIVE_SESSIONS_PER_USER = 5;

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export async function createSession(userId: string): Promise<void> {
  const now = new Date();

  await prisma.session.deleteMany({
    where: {
      OR: [
        { expiresAt: { lte: now } },
        {
          userId,
          createdAt: {
            lt: new Date(now.getTime() - SESSION_MAX_AGE_SECONDS * 1000),
          },
        },
      ],
    },
  });

  const existingSessionCount = await prisma.session.count({
    where: { userId },
  });

  if (existingSessionCount >= MAX_ACTIVE_SESSIONS_PER_USER) {
    const oldestSessions = await prisma.session.findMany({
      where: { userId },
      orderBy: { createdAt: "asc" },
      select: { id: true },
      take: existingSessionCount - MAX_ACTIVE_SESSIONS_PER_USER + 1,
    });

    await prisma.session.deleteMany({
      where: { id: { in: oldestSessions.map((session) => session.id) } },
    });
  }

  const token = randomBytes(32).toString("hex");
  const tokenHash = hashToken(token);
  const expiresAt = new Date(Date.now() + SESSION_MAX_AGE_SECONDS * 1000);

  await prisma.session.create({
    data: {
      userId,
      tokenHash,
      expiresAt,
    },
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: expiresAt,
  });
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (token) {
    await prisma.session.deleteMany({
      where: { tokenHash: hashToken(token) },
    });
  }

  cookieStore.delete(SESSION_COOKIE);
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  const session = await prisma.session.findFirst({
    where: {
      tokenHash: hashToken(token),
      expiresAt: {
        gt: new Date(),
      },
    },
    include: {
      user: true,
    },
  });

  if (!session) {
    cookieStore.delete(SESSION_COOKIE);
    return null;
  }

  return session.user;
}

type CurrentUserLike = {
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  role?: string | null;
};

export function getUserDisplayName(user: CurrentUserLike): string {
  const firstName = user.firstName?.trim() ?? "";
  const lastName = user.lastName?.trim() ?? "";
  const fullName = `${firstName} ${lastName}`.trim();

  return fullName || user.email;
}

export function isAdminUser(user: CurrentUserLike): boolean {
  return user.role === "ADMIN";
}
