import { readBody } from 'h3';
import authService from '~/server/modules/auth/service';
import { forgotPasswordSchema } from '~/server/modules/auth/validators';
import { successResponse, validationErrorResponse } from '~/server/shared/response';

/**
 * POST /api/auth/forgot-password
 * Router: Forgot password endpoint
 * Flow: Request → Validator → Service → Repository → Email → Response
 */
export default defineEventHandler(async (event) => {
  try {
    // 1. Get request body
    const body = await readBody(event);

    // 2. Validate request (Middleware: Validator)
    const { error, value } = forgotPasswordSchema.validate(body);
    if (error) {
      return validationErrorResponse(error.details[0].message);
    }

    const { email } = value;

    // 3. Call service (Service Layer)
    const result = await authService.forgotPassword(email);

    if (!result.success) {
      throw createError({
        statusCode: 404,
        message: result.message
      });
    }

    // 4. Return response (Interceptor: Response)
    return successResponse(null, result.message);
  } catch (error) {
    console.error('[ForgotPasswordRoute] Error:', error);

    if (error.statusCode) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      message: 'Terjadi kesalahan saat mereset password'
    });
  }
});
