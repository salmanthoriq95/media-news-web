import db from '../../utils/db.js';

/**
 * User Repository - Data Access Layer untuk User Module
 */
export default {
  /**
   * Create new user
   */
  async createUser(userData) {
    try {
      const [userId] = await db('users').insert({
        ...userData,
        is_first_login: true,
        created_at: db.fn.now(),
        updated_at: db.fn.now()
      });

      return userId;
    } catch (error) {
      console.error('[UserRepository] Error in createUser:', error);
      throw error;
    }
  },

  /**
   * Find user by email
   */
  async findByEmail(email) {
    try {
      return await db('users')
        .where({ email })
        .first();
    } catch (error) {
      console.error('[UserRepository] Error in findByEmail:', error);
      throw error;
    }
  },

  /**
   * Get all users (exclude password)
   */
  async getAllUsers() {
    try {
      return await db('users')
        .select('user_id', 'name', 'email', 'photo', 'is_first_login', 'created_at', 'updated_at')
        .orderBy('created_at', 'desc');
    } catch (error) {
      console.error('[UserRepository] Error in getAllUsers:', error);
      throw error;
    }
  }
};
