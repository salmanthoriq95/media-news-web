import { requireAuth } from '~/server/shared/authMiddleware';
import authService from '~/server/modules/auth/service';
import { successResponse } from '~/server/shared/response';

/**
 * GET /api/auth/session
 * Router: Check session endpoint
 * Flow: Request → Auth Middleware → Service → Response
 */
export default defineEventHandler(async (event) => {
  try {
    // 1. Check authentication (Middleware)
    const session = await requireAuth(event);

    // 2. Get fresh user data from service
    const result = await authService.getUserSession(session.userId);

    if (!result.success) {
      throw createError({
        statusCode: 401,
        message: result.message
      });
    }

    // 3. Return response
    return successResponse(result.data, 'Session valid');
  } catch (error) {
    console.error('[SessionRoute] Error:', error);

    if (error.statusCode === 401) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      message: 'Terjadi kesalahan saat mengecek session'
    });
  }
});
