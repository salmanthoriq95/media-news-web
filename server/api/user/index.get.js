import { requireAuth } from '~/server/shared/authMiddleware';
import userService from '~/server/modules/user/service';
import { successResponse } from '~/server/shared/response';

/**
 * GET /api/user
 * Router: Get all users endpoint
 */
export default defineEventHandler(async (event) => {
  try {
    // 1. Check authentication
    await requireAuth(event);

    // 2. Call service
    const result = await userService.getAllUsers();

    if (!result.success) {
      throw createError({
        statusCode: 400,
        message: result.message
      });
    }

    // 3. Return response
    return successResponse(result.data, 'Users berhasil diambil');
  } catch (error) {
    console.error('[GetUsersRoute] Error:', error);

    if (error.statusCode) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      message: 'Terjadi kesalahan saat mengambil users'
    });
  }
});
