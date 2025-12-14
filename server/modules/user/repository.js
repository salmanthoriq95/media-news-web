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
  },

  /**
   * Find user by ID (exclude password)
   */
  async findById(userId) {
    try {
      return await db('users')
        .select('user_id', 'name', 'email', 'photo', 'is_first_login', 'created_at', 'updated_at')
        .where({ user_id: userId })
        .first();
    } catch (error) {
      console.error('[UserRepository] Error in findById:', error);
      throw error;
    }
  },

  /**
   * Update user
   */
  async updateUser(userId, userData) {
    try {
      await db('users')
        .where({ user_id: userId })
        .update({
          ...userData,
          updated_at: db.fn.now()
        });

      return await this.findById(userId);
    } catch (error) {
      console.error('[UserRepository] Error in updateUser:', error);
      throw error;
    }
  },

  /**
   * Delete user
   */
  async deleteUser(userId) {
    try {
      const deleted = await db('users')
        .where({ user_id: userId })
        .del();

      return deleted > 0;
    } catch (error) {
      console.error('[UserRepository] Error in deleteUser:', error);
      throw error;
    }
  },

  /**
   * Count total users
   */
  async countUsers() {
    try {
      const result = await db('users')
        .count('user_id as count')
        .first();
      return result.count;
    } catch (error) {
      console.error('[UserRepository] Error in countUsers:', error);
      throw error;
    }
  }
};
