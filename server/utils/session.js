import { getCookie, setCookie } from 'h3';
import crypto from 'crypto';

const SESSION_COOKIE_NAME = 'media_session';
const SESSION_TTL = 24 * 60 * 60 * 1000; // 24 hours
const MAX_SESSIONS_PER_USER = 5; // Limit concurrent sessions

// In-memory session store (in production, use Redis or database)
const sessionStore = new Map();

// Generate cryptographically secure session ID
function generateSessionId() {
  return crypto.randomBytes(32).toString('hex');
}

// Get user agent hash untuk session binding
function getUserAgentHash(req) {
  const userAgent = req.headers['user-agent'] || '';
  return crypto.createHash('sha256').update(userAgent).digest('hex').substring(0, 16);
}

// Get client IP
function getClientIp(req) {
  return req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
         req.headers['x-real-ip'] ||
         req.socket.remoteAddress ||
         'unknown';
}

// Cleanup expired sessions (run periodically)
function cleanupExpiredSessions() {
  const now = Date.now();
  for (const [sessionId, session] of sessionStore.entries()) {
    if (now > session.expiresAt) {
      sessionStore.delete(sessionId);
    }
  }
}

// Run cleanup every 15 minutes
setInterval(cleanupExpiredSessions, 15 * 60 * 1000);

// Limit sessions per user
function limitUserSessions(userId) {
  const userSessions = [];

  for (const [sessionId, session] of sessionStore.entries()) {
    if (session.data.userId === userId) {
      userSessions.push({ sessionId, createdAt: session.createdAt });
    }
  }

  // Sort by creation time, oldest first
  userSessions.sort((a, b) => a.createdAt - b.createdAt);

  // Remove oldest sessions if exceeds limit
  while (userSessions.length >= MAX_SESSIONS_PER_USER) {
    const oldestSession = userSessions.shift();
    sessionStore.delete(oldestSession.sessionId);
  }
}

// Get session from cookie dengan security checks
export async function getSession(event) {
  const sessionId = getCookie(event, SESSION_COOKIE_NAME);

  if (!sessionId) {
    return null;
  }

  const session = sessionStore.get(sessionId);

  if (!session) {
    return null;
  }

  // Check if session expired
  if (Date.now() > session.expiresAt) {
    sessionStore.delete(sessionId);
    return null;
  }

  // Security: Verify user agent (prevent session hijacking)
  const currentUAHash = getUserAgentHash(event.node.req);
  if (session.userAgentHash !== currentUAHash) {
    console.warn('[Security] Session user-agent mismatch detected', {
      sessionId: sessionId.substring(0, 8),
      ip: getClientIp(event.node.req)
    });
    sessionStore.delete(sessionId);
    return null;
  }

  // Security: Check IP change (warning only, don't invalidate - users may have dynamic IP)
  const currentIp = getClientIp(event.node.req);
  if (session.ip !== currentIp) {
    console.warn('[Security] Session IP changed', {
      sessionId: sessionId.substring(0, 8),
      oldIp: session.ip,
      newIp: currentIp
    });
    // Update IP but don't invalidate session
    session.ip = currentIp;
  }

  return session.data;
}

// Set session dengan security metadata
export async function setSession(event, data) {
  let sessionId = getCookie(event, SESSION_COOKIE_NAME);

  if (!sessionId) {
    sessionId = generateSessionId();
  }

  // Limit concurrent sessions per user
  if (data.userId) {
    limitUserSessions(data.userId);
  }

  const session = {
    data,
    expiresAt: Date.now() + SESSION_TTL,
    createdAt: Date.now(),
    userAgentHash: getUserAgentHash(event.node.req),
    ip: getClientIp(event.node.req)
  };

  sessionStore.set(sessionId, session);

  setCookie(event, SESSION_COOKIE_NAME, sessionId, {
    httpOnly: true, // Prevent XSS access to cookie
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    sameSite: 'strict', // CSRF protection (changed from lax to strict)
    maxAge: SESSION_TTL / 1000,
    path: '/'
  });

  return sessionId;
}

// Update session
export async function updateSession(event, data) {
  const sessionId = getCookie(event, SESSION_COOKIE_NAME);

  if (!sessionId || !sessionStore.has(sessionId)) {
    return await setSession(event, data);
  }

  const session = sessionStore.get(sessionId);
  session.data = { ...session.data, ...data };
  session.expiresAt = Date.now() + SESSION_TTL;

  sessionStore.set(sessionId, session);

  return sessionId;
}

// Destroy session
export async function destroySession(event) {
  const sessionId = getCookie(event, SESSION_COOKIE_NAME);

  if (sessionId) {
    sessionStore.delete(sessionId);
    setCookie(event, SESSION_COOKIE_NAME, '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/'
    });
  }
}

// Require auth middleware
export async function requireAuth(event) {
  const session = await getSession(event);

  if (!session || !session.userId) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized - Please login'
    });
  }

  return session;
}
