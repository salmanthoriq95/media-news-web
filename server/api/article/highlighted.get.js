import articleService from '~/server/modules/article/service';
import { successResponse } from '~/server/shared/response';

/**
 * GET /api/article/highlighted
 * Get highlighted articles for hero section
 */
export default defineEventHandler(async (event) => {
  try {
    const result = await articleService.getHighlightedArticles();

    if (!result.success) {
      throw createError({
        statusCode: 500,
        message: result.message
      });
    }

    return successResponse(result.data, 'Highlighted articles loaded successfully');
  } catch (error) {
    console.error('[GetHighlightedArticlesRoute] Error:', error);

    if (error.statusCode) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      message: 'Terjadi kesalahan saat mengambil highlighted articles'
    });
  }
});
