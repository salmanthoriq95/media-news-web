import configService from '~/server/modules/config/service';
import { successResponse } from '~/server/shared/response';

/**
 * GET /api/config
 * Router: Get config endpoint (public)
 */
export default defineEventHandler(async (event) => {
  try {
    const result = await configService.getConfig();

    if (!result.success) {
      throw createError({
        statusCode: 404,
        message: result.message
      });
    }

    return successResponse(result.data, 'Config berhasil diambil');
  } catch (error) {
    console.error('[ConfigRoute] Error:', error);

    if (error.statusCode) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      message: 'Terjadi kesalahan saat mengambil config'
    });
  }
});
