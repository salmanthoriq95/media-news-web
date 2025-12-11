import { getSession } from '~/server/utils/session';
import { unauthorizedResponse } from './response';

/**
 * Auth Middleware - Protect routes that require authentication
 */
export const requireAuth = async (event) => {
  const session = await getSession(event);

  if (!session || !session.userId) {
    return unauthorizedResponse('Silakan login terlebih dahulu');
  }

  // Attach user session to event context
  event.context.user = session;

  return session;
};

/**
 * First Login Middleware - Force password change for first login
 */
export const checkFirstLogin = async (event) => {
  const session = await requireAuth(event);

  if (session.isFirstLogin) {
    throw createError({
      statusCode: 403,
      message: 'Anda harus mengubah password terlebih dahulu'
    });
  }

  return session;
};
