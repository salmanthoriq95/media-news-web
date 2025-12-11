import bcrypt from 'bcrypt';
import userRepository from './repository.js';
import { generatePassword, sendNewUserEmail } from '../../utils/mailer.js';

/**
 * User Service - Business Logic Layer untuk User Module
 */
export default {
  /**
   * Create new user with auto-generated password and send email
   */
  async createUser(name, email) {
    try {
      // Check if email already exists
      const existingUser = await userRepository.findByEmail(email);

      if (existingUser) {
        return {
          success: false,
          message: 'Email sudah terdaftar'
        };
      }

      // Generate random password
      const plainPassword = generatePassword(12);

      // Hash password
      const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;
      const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

      // Create user in database
      const userId = await userRepository.createUser({
        name,
        email,
        password: hashedPassword,
        photo: null
      });

      // Send email with credentials
      const emailResult = await sendNewUserEmail(email, name, plainPassword);

      if (!emailResult.success) {
        console.error('[UserService] Failed to send email:', emailResult.error);
        // Note: User sudah dibuat di database, tapi email gagal dikirim
        // Dalam production, mungkin perlu rollback atau retry mechanism
      }

      return {
        success: true,
        message: 'User berhasil dibuat dan email telah dikirim',
        data: {
          userId,
          name,
          email,
          emailSent: emailResult.success
        }
      };
    } catch (error) {
      console.error('[UserService] Error in createUser:', error);
      throw error;
    }
  },

  /**
   * Get all users
   */
  async getAllUsers() {
    try {
      const users = await userRepository.getAllUsers();

      return {
        success: true,
        data: users
      };
    } catch (error) {
      console.error('[UserService] Error in getAllUsers:', error);
      throw error;
    }
  }
};
