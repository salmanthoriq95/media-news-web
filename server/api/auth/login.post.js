import { readBody } from 'h3';
import authService from '~/server/modules/auth/service';
import { loginSchema } from '~/server/modules/auth/validators';
import { successResponse, validationErrorResponse, unauthorizedResponse } from '~/server/shared/response';
import { setSession } from '~/server/utils/session';
import { loginLimiter } from '../../security/rateLimiter.js';

/**
 * POST /api/auth/login
 * Router: Login endpoint dengan rate limiting
 * Flow: Request → Rate Limiter → Validator → Service → Repository → Response
 */
export default defineEventHandler(async (event) => {
  try {
    // 0. Apply rate limiting
    await loginLimiter(event);

    // 1. Get request body
    const body = await readBody(event);
    
    // 2. Validate request (Middleware: Validator)
    const { error, value } = loginSchema.validate(body);
    if (error) {
      return validationErrorResponse(error.details[0].message);
    }
    
    const { email, password } = value;
    
    // 3. Call service (Service Layer)
    const result = await authService.login(email, password);
    
    if (!result.success) {
      return unauthorizedResponse(result.message);
    }
    
    // 4. Set session
    await setSession(event, result.data);
    
    // 5. Return response (Interceptor: Response)
    return successResponse(result.data, 'Login berhasil');
  } catch (error) {
    console.error('[LoginRoute] Error:', error);
    throw createError({
      statusCode: 500,
      message: 'Terjadi kesalahan saat login'
    });
  }
});
