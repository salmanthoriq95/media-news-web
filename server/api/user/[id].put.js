import { readBody } from 'h3';
import { requireAuth } from '~/server/shared/authMiddleware';
import userService from '~/server/modules/user/service';
import { updateUserSchema } from '~/server/modules/user/validators';
import { successResponse, validationErrorResponse } from '~/server/shared/response';

/**
 * PUT /api/user/:id
 * Router: Update user endpoint
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

    // 3. Get request body
    const body = await readBody(event);

    // 4. Validate request
    const { error, value } = updateUserSchema.validate(body);
    if (error) {
      return validationErrorResponse(error.details[0].message);
    }

    const { name, email, photo, password } = value;

    // 5. Call service
    const result = await userService.updateUser(userId, name, email, photo, password);

    if (!result.success) {
      throw createError({
        statusCode: 400,
        message: result.message
      });
    }

    // 6. Return response
    return successResponse(result.data, result.message);
  } catch (error) {
    console.error('[UpdateUserRoute] Error:', error);

    if (error.statusCode) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      message: 'Terjadi kesalahan saat mengupdate user'
    });
  }
});
