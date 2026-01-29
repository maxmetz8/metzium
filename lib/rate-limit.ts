// Simple in-memory rate limiter
// Stores IP addresses and their request timestamps
// NOTE: This implementation is suitable for single-server deployments.
// For serverless environments (e.g., Vercel), consider using Redis or a 
// database-backed solution for persistent rate limiting across instances.
type RateLimitStore = Map<string, number[]>;

const store: RateLimitStore = new Map();

const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes in milliseconds
const MAX_REQUESTS = 5;

export function checkRateLimit(ip: string): { allowed: boolean; remaining: number; resetAt: Date } {
  const now = Date.now();
  const timestamps = store.get(ip) || [];
  
  // Remove timestamps outside the current window (on-demand cleanup)
  const validTimestamps = timestamps.filter(timestamp => now - timestamp < RATE_LIMIT_WINDOW);
  
  // Check if limit is exceeded
  if (validTimestamps.length >= MAX_REQUESTS) {
    const oldestTimestamp = validTimestamps[0];
    const resetAt = new Date(oldestTimestamp + RATE_LIMIT_WINDOW);
    return {
      allowed: false,
      remaining: 0,
      resetAt
    };
  }
  
  // Add current timestamp
  validTimestamps.push(now);
  store.set(ip, validTimestamps);
  
  return {
    allowed: true,
    remaining: MAX_REQUESTS - validTimestamps.length,
    resetAt: new Date(now + RATE_LIMIT_WINDOW)
  };
}

// Periodic cleanup - runs only in non-serverless environments
// In serverless, cleanup happens on-demand in checkRateLimit
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, timestamps] of store.entries()) {
      const validTimestamps = timestamps.filter(timestamp => now - timestamp < RATE_LIMIT_WINDOW);
      if (validTimestamps.length === 0) {
        store.delete(ip);
      } else {
        store.set(ip, validTimestamps);
      }
    }
  }, RATE_LIMIT_WINDOW);
}
