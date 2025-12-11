import db from '../../utils/db.js';

/**
 * Auth Repository - Data Access Layer untuk Auth Module
 */
export default {
  /**
   * Find user by email
   */
  async findUserByEmail(email) {
    try {
      return await db('users')
        .where({ email })
        .first();
    } catch (error) {
      console.error('[AuthRepository] Error in findUserByEmail:', error);
      throw error;
    }
  },

  /**
   * Find user by ID
   */
  async findUserById(userId) {
    try {
      return await db('users')
        .where({ user_id: userId })
        .first();
    } catch (error) {
      console.error('[AuthRepository] Error in findUserById:', error);
      throw error;
    }
  },

  /**
   * Update user password
   */
  async updatePassword(userId, hashedPassword) {
    try {
      const result = await db('users')
        .where({ user_id: userId })
        .update({
          password: hashedPassword,
          is_first_login: false,
          updated_at: db.fn.now()
        });

      return result > 0;
    } catch (error) {
      console.error('[AuthRepository] Error in updatePassword:', error);
      throw error;
    }
  },

  /**
   * Reset password (untuk forgot password)
   * Set password baru dan aktifkan is_first_login
   */
  async resetPassword(userId, hashedPassword) {
    try {
      const result = await db('users')
        .where({ user_id: userId })
        .update({
          password: hashedPassword,
          is_first_login: true,
          updated_at: db.fn.now()
        });

      return result > 0;
    } catch (error) {
      console.error('[AuthRepository] Error in resetPassword:', error);
      throw error;
    }
  }
};
