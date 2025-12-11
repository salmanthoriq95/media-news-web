import { readBody } from 'h3';
import { checkFirstLogin } from '~/server/shared/authMiddleware';
import articleService from '~/server/modules/article/service';
import { updateArticleSchema } from '~/server/modules/article/validators';
import { successResponse, validationErrorResponse, notFoundResponse } from '~/server/shared/response';

/**
 * PUT /api/article/[id]
 * Router: Update article endpoint
 * Flow: Request → Auth Middleware → Validator → Service → Repository → Response
 */
export default defineEventHandler(async (event) => {
  try {
    // 1. Check authentication & first login (Middleware)
    const session = await checkFirstLogin(event);

    // 2. Get hashid from params
    const hashId = event.context.params.id;

    // 3. Get request body
    const body = await readBody(event);

    // 4. Validate request (Middleware: Validator)
    const { error, value } = updateArticleSchema.validate(body);
    if (error) {
      return validationErrorResponse(error.details[0].message);
    }

    // 5. Call service (Service Layer)
    const result = await articleService.updateArticle(hashId, value, session.userId);

    if (!result.success) {
      return notFoundResponse(result.message);
    }

    // 6. Return response (Interceptor: Response)
    return successResponse(null, result.message);
  } catch (error) {
    console.error('[UpdateArticleRoute] Error:', error);

    if (error.statusCode) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      message: 'Terjadi kesalahan saat mengupdate article'
    });
  }
});
