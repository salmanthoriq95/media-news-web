import articleService from '~/server/modules/article/service';
import { successResponse } from '~/server/shared/response';

/**
 * GET /api/article
 * Router: Get latest articles (for homepage)
 * Flow: Request → Service → Repository → Response
 */
export default defineEventHandler(async (event) => {
  try {
    // Get latest 6 articles
    const result = await articleService.getLatestArticles(6);

    return successResponse(result.data, 'Articles loaded successfully');
  } catch (error) {
    console.error('[GetArticlesRoute] Error:', error);
    throw createError({
      statusCode: 500,
      message: 'Terjadi kesalahan saat mengambil articles'
    });
  }
});
