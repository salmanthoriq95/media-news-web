import { readBody } from 'h3';
import { checkFirstLogin } from '~/server/shared/authMiddleware';
import articleService from '~/server/modules/article/service';
import { createArticleSchema } from '~/server/modules/article/validators';
import { successResponse, validationErrorResponse } from '~/server/shared/response';

/**
 * POST /api/article/create
 * Router: Create article endpoint
 * Flow: Request → Auth Middleware → Validator → Service → Repository → Response
 */
export default defineEventHandler(async (event) => {
  try {
    // 1. Check authentication & first login (Middleware)
    const session = await checkFirstLogin(event);

    // 2. Get request body
    const body = await readBody(event);

    // 3. Validate request (Middleware: Validator)
    const { error, value } = createArticleSchema.validate(body);
    if (error) {
      return validationErrorResponse(error.details[0].message);
    }

    // 4. Call service (Service Layer)
    const result = await articleService.createArticle(value, session.userId);

    if (!result.success) {
      throw createError({
        statusCode: 400,
        message: result.message
      });
    }

    // 5. Return response (Interceptor: Response)
    return successResponse(result.data, result.message);
  } catch (error) {
    console.error('[CreateArticleRoute] Error:', error);

    if (error.statusCode) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      message: 'Terjadi kesalahan saat membuat article'
    });
  }
});
