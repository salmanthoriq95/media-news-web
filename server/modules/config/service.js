import configRepository from './repository.js';

/**
 * Config Service - Business Logic Layer untuk Config Module
 */
export default {
  /**
   * Get config
   */
  async getConfig() {
    try {
      const config = await configRepository.getConfig();

      if (!config) {
        return {
          success: false,
          message: 'Konfigurasi tidak ditemukan'
        };
      }

      return {
        success: true,
        data: config
      };
    } catch (error) {
      console.error('[ConfigService] Error in getConfig:', error);
      throw error;
    }
  },

  /**
   * Update config
   */
  async updateConfig(configData, userId) {
    try {
      const updated = await configRepository.updateConfig(configData, userId);

      if (!updated) {
        return {
          success: false,
          message: 'Gagal mengupdate konfigurasi'
        };
      }

      return {
        success: true,
        message: 'Konfigurasi berhasil diupdate'
      };
    } catch (error) {
      console.error('[ConfigService] Error in updateConfig:', error);
      throw error;
    }
  }
};
