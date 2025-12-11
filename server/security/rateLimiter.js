/**
 * Rate Limiter Middleware for H3/Nuxt
 * Mencegah brute force attacks dan DoS attacks
 */

// Simple in-memory rate limiter (production: use Redis)
class RateLimiter {
  constructor(windowMs, max) {
    this.windowMs = windowMs;
    this.max = max;
    this.requests = new Map();

    // Cleanup old entries every minute
    setInterval(() => this.cleanup(), 60000);
  }

  cleanup() {
    const now = Date.now();
    for (const [key, data] of this.requests.entries()) {
      if (now - data.resetTime > this.windowMs) {
        this.requests.delete(key);
      }
    }
  }

  async check(ip) {
    const now = Date.now();
    const key = ip;

    let data = this.requests.get(key);

    if (!data || now - data.resetTime > this.windowMs) {
      data = {
        count: 0,
        resetTime: now
      };
      this.requests.set(key, data);
    }

    data.count++;

    if (data.count > this.max) {
      const retryAfter = Math.ceil((this.windowMs - (now - data.resetTime)) / 1000);
      return {
        allowed: false,
        retryAfter,
        limit: this.max,
        remaining: 0
      };
    }

    return {
      allowed: true,
      limit: this.max,
      remaining: this.max - data.count,
      resetTime: data.resetTime + this.windowMs
    };
  }
}

// Create rate limiters
const loginLimiterInstance = new RateLimiter(15 * 60 * 1000, 5); // 5 attempts per 15 min
const apiLimiterInstance = new RateLimiter(15 * 60 * 1000, 100); // 100 requests per 15 min
const uploadLimiterInstance = new RateLimiter(60 * 60 * 1000, 20); // 20 uploads per hour
const createUserLimiterInstance = new RateLimiter(60 * 60 * 1000, 10); // 10 users per hour

// Helper to get client IP
function getClientIp(req) {
  return req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
         req.headers['x-real-ip'] ||
         req.socket.remoteAddress ||
         'unknown';
}

// Rate limiter middleware factory
function createRateLimitMiddleware(limiter, message) {
  return async (event) => {
    const ip = getClientIp(event.node.req);
    const result = await limiter.check(ip);

    // Set rate limit headers
    event.node.res.setHeader('X-RateLimit-Limit', result.limit);
    event.node.res.setHeader('X-RateLimit-Remaining', result.remaining);

    if (!result.allowed) {
      event.node.res.setHeader('Retry-After', result.retryAfter);

      throw createError({
        statusCode: 429,
        message: message || 'Terlalu banyak permintaan. Silakan coba lagi nanti.'
      });
    }
  };
}

// Export middleware functions
export const loginLimiter = createRateLimitMiddleware(
  loginLimiterInstance,
  'Terlalu banyak percobaan login. Silakan coba lagi dalam 15 menit.'
);

export const apiLimiter = createRateLimitMiddleware(
  apiLimiterInstance,
  'Terlalu banyak permintaan dari IP ini. Silakan coba lagi nanti.'
);

export const uploadLimiter = createRateLimitMiddleware(
  uploadLimiterInstance,
  'Terlalu banyak upload. Silakan coba lagi dalam 1 jam.'
);

export const createUserLimiter = createRateLimitMiddleware(
  createUserLimiterInstance,
  'Terlalu banyak pembuatan user. Silakan coba lagi nanti.'
);
