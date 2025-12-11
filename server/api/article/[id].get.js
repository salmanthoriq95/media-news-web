import articleService from '~/server/modules/article/service';
import { successResponse, notFoundResponse } from '~/server/shared/response';

/**
 * GET /api/article/[id]
 * Router: Get article by hashid
 * Flow: Request → Service → Repository → Response
 */
export default defineEventHandler(async (event) => {
  try {
    const hashId = event.context.params.id;

    const result = await articleService.getArticleByHashId(hashId);

    if (!result.success) {
      return notFoundResponse(result.message);
    }

    return successResponse(result.data, 'Article loaded successfully');
  } catch (error) {
    console.error('[GetArticleByIdRoute] Error:', error);
    throw createError({
      statusCode: 500,
      message: 'Terjadi kesalahan saat mengambil article'
    });
  }
});
