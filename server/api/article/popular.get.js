import articleService from '~/server/modules/article/service';
import { successResponse } from '~/server/shared/response';

/**
 * GET /api/article/popular
 * Router: Get non-highlighted articles with pagination (for popular section)
 * Query params: page (default: 1), limit (default: 6)
 * Flow: Request → Service → Repository → Response
 */
export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 6;

    // Get non-highlighted articles with pagination
    const result = await articleService.getPopularArticlesPaginated(page, limit);

    return successResponse(result, 'Popular articles loaded successfully');
  } catch (error) {
    console.error('[GetPopularArticlesRoute] Error:', error);
    throw createError({
      statusCode: 500,
      message: 'Terjadi kesalahan saat mengambil articles'
    });
  }
});
