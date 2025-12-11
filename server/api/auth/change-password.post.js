import { readBody } from 'h3';
import { requireAuth } from '~/server/shared/authMiddleware';
import authService from '~/server/modules/auth/service';
import { changePasswordSchema } from '~/server/modules/auth/validators';
import { successResponse, validationErrorResponse } from '~/server/shared/response';
import { updateSession } from '~/server/utils/session';

/**
 * POST /api/auth/change-password
 * Router: Change password endpoint (untuk first login)
 * Flow: Request → Auth Middleware → Validator → Service → Response
 */
export default defineEventHandler(async (event) => {
  try {
    // 1. Check authentication (Middleware)
    const session = await requireAuth(event);

    // 2. Get request body
    const body = await readBody(event);

    // 3. Validate request (Middleware: Validator)
    const { error, value } = changePasswordSchema.validate(body);
    if (error) {
      return validationErrorResponse(error.details[0].message);
    }

    const { newPassword } = value;

    // 4. Call service (Service Layer)
    const result = await authService.changePassword(session.userId, newPassword);

    if (!result.success) {
      throw createError({
        statusCode: 400,
        message: result.message
      });
    }

    // 5. Update session (set isFirstLogin = false)
    await updateSession(event, {
      ...session,
      isFirstLogin: false
    });

    // 6. Return response
    return successResponse(null, result.message);
  } catch (error) {
    console.error('[ChangePasswordRoute] Error:', error);

    if (error.statusCode) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      message: 'Terjadi kesalahan saat mengubah password'
    });
  }
});
