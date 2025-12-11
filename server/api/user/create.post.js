import { readBody } from 'h3';
import { checkFirstLogin } from '~/server/shared/authMiddleware';
import userService from '~/server/modules/user/service';
import { createUserSchema } from '~/server/modules/user/validators';
import { successResponse, validationErrorResponse } from '~/server/shared/response';
import { createUserLimiter } from '../../security/rateLimiter.js';

/**
 * POST /api/user/create
 * Router: Create new user endpoint dengan rate limiting
 * Flow: Request → Rate Limiter → Auth Middleware → Validator → Service → Repository → Email → Response
 */
export default defineEventHandler(async (event) => {
  try {
    // 0. Apply rate limiting
    await createUserLimiter(event);

    // 1. Check authentication & first login (Middleware)
    await checkFirstLogin(event);

    // 2. Get request body
    const body = await readBody(event);

    // 3. Validate request (Middleware: Validator)
    const { error, value } = createUserSchema.validate(body);
    if (error) {
      return validationErrorResponse(error.details[0].message);
    }

    const { name, email } = value;

    // 4. Call service (Service Layer)
    const result = await userService.createUser(name, email);

    if (!result.success) {
      throw createError({
        statusCode: 400,
        message: result.message
      });
    }

    // 5. Return response (Interceptor: Response)
    return successResponse(result.data, result.message);
  } catch (error) {
    console.error('[CreateUserRoute] Error:', error);

    if (error.statusCode) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      message: 'Terjadi kesalahan saat membuat user'
    });
  }
});
