import { requireAuth } from '~/server/shared/authMiddleware';
import userService from '~/server/modules/user/service';
import { successResponse, validationErrorResponse } from '~/server/shared/response';

/**
 * DELETE /api/user/:id
 * Router: Delete user endpoint
 */
export default defineEventHandler(async (event) => {
  try {
    // 1. Check authentication
    await requireAuth(event);

    // 2. Get user ID from route params
    const userId = parseInt(event.context.params.id);

    if (!userId || isNaN(userId)) {
      return validationErrorResponse('User ID tidak valid');
    }

    // 3. Call service
    const result = await userService.deleteUser(userId);

    if (!result.success) {
      throw createError({
        statusCode: 400,
        message: result.message
      });
    }

    // 4. Return response
    return successResponse(null, result.message);
  } catch (error) {
    console.error('[DeleteUserRoute] Error:', error);

    if (error.statusCode) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      message: 'Terjadi kesalahan saat menghapus user'
    });
  }
});
