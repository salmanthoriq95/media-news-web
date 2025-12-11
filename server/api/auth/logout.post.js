import { destroySession } from '~/server/utils/session';
import { successResponse } from '~/server/shared/response';

/**
 * POST /api/auth/logout
 * Router: Logout endpoint
 * Flow: Request → Destroy Session → Response
 */
export default defineEventHandler(async (event) => {
  try {
    // Destroy session
    await destroySession(event);

    // Return response
    return successResponse(null, 'Logout berhasil');
  } catch (error) {
    console.error('[LogoutRoute] Error:', error);
    throw createError({
      statusCode: 500,
      message: 'Terjadi kesalahan saat logout'
    });
  }
});
