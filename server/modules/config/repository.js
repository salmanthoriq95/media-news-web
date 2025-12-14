import db from '../../utils/db.js';

/**
 * Config Repository - Data Access Layer untuk Config Module
 */
export default {
  /**
   * Get config (always returns first and only record)
   */
  async getConfig() {
    try {
      return await db('config')
        .select('*')
        .first();
    } catch (error) {
      console.error('[ConfigRepository] Error in getConfig:', error);
      throw error;
    }
  },

  /**
   * Update config
   */
  async updateConfig(configData, userId) {
    try {
      const result = await db('config')
        .update({
          ...configData,
          updated_by: userId,
          updated_at: db.fn.now()
        });

      return result > 0;
    } catch (error) {
      console.error('[ConfigRepository] Error in updateConfig:', error);
      throw error;
    }
  }
};
