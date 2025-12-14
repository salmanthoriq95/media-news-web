import { readBody } from 'h3';
import { requireAuth } from '~/server/shared/authMiddleware';
import configService from '~/server/modules/config/service';
import { updateConfigSchema } from '~/server/modules/config/validators';
import { successResponse, validationErrorResponse } from '~/server/shared/response';

/**
 * PUT /api/config/update
 * Router: Update config endpoint
 */
export default defineEventHandler(async (event) => {
  try {
    // 1. Check authentication
    const session = await requireAuth(event);

    // 2. Get request body
    const body = await readBody(event);

    // 3. Validate request
    const { error, value } = updateConfigSchema.validate(body);
    if (error) {
      return validationErrorResponse(error.details[0].message);
    }

    // 4. Call service
    const result = await configService.updateConfig(value, session.userId);

    if (!result.success) {
      throw createError({
        statusCode: 400,
        message: result.message
      });
    }

    // 5. Return response
    return successResponse(null, result.message);
  } catch (error) {
    console.error('[UpdateConfigRoute] Error:', error);

    if (error.statusCode) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      message: 'Terjadi kesalahan saat mengupdate config'
    });
  }
});
