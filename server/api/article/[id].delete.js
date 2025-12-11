import { checkFirstLogin } from '~/server/shared/authMiddleware';
import articleService from '~/server/modules/article/service';
import { successResponse, notFoundResponse } from '~/server/shared/response';

/**
 * DELETE /api/article/[id]
 * Router: Delete article endpoint (hard delete)
 * Flow: Request → Auth Middleware → Service → Repository → Response
 */
export default defineEventHandler(async (event) => {
  try {
    // 1. Check authentication & first login (Middleware)
    await checkFirstLogin(event);

    // 2. Get hashid from params
    const hashId = event.context.params.id;

    // 3. Call service (Service Layer)
    const result = await articleService.deleteArticle(hashId);

    if (!result.success) {
      return notFoundResponse(result.message);
    }

    // 4. Return response (Interceptor: Response)
    return successResponse(null, result.message);
  } catch (error) {
    console.error('[DeleteArticleRoute] Error:', error);

    if (error.statusCode) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      message: 'Terjadi kesalahan saat menghapus article'
    });
  }
});
