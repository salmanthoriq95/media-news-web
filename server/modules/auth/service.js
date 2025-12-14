import bcrypt from 'bcrypt';
import authRepository from './repository.js';
import { generatePassword, sendForgotPasswordEmail } from '../../utils/mailer.js';

/**
 * Auth Service - Business Logic Layer untuk Auth Module
 */
export default {
  /**
   * Login user
   */
  async login(email, password) {
    try {
      // Get user from repository
      const user = await authRepository.findUserByEmail(email);

      if (!user) {
        return {
          success: false,
          message: 'Email atau password salah'
        };
      }

      // Compare password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return {
          success: false,
          message: 'Email atau password salah'
        };
      }

      // Return user data (exclude password)
      return {
        success: true,
        data: {
          userId: user.user_id,
          name: user.name,
          email: user.email,
          photo: user.photo,
          isFirstLogin: user.is_first_login
        }
      };
    } catch (error) {
      console.error('[AuthService] Error in login:', error);
      throw error;
    }
  },

  /**
   * Get user session data
   */
  async getUserSession(userId) {
    try {
      const user = await authRepository.findUserById(userId);

      if (!user) {
        return {
          success: false,
          message: 'User tidak ditemukan'
        };
      }

      return {
        success: true,
        data: {
          userId: user.user_id,
          name: user.name,
          email: user.email,
          photo: user.photo,
          isFirstLogin: user.is_first_login
        }
      };
    } catch (error) {
      console.error('[AuthService] Error in getUserSession:', error);
      throw error;
    }
  },

  /**
   * Change password (first login)
   */
  async changePassword(userId, newPassword) {
    try {
      // Hash new password
      const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

      // Update password
      const updated = await authRepository.updatePassword(userId, hashedPassword);

      if (!updated) {
        return {
          success: false,
          message: 'Gagal mengubah password'
        };
      }

      return {
        success: true,
        message: 'Password berhasil diubah'
      };
    } catch (error) {
      console.error('[AuthService] Error in changePassword:', error);
      throw error;
    }
  },

  /**
   * Forgot password - generate new password and send email
   */
  async forgotPassword(email) {
    try {
      // Check if user exists
      const user = await authRepository.findUserByEmail(email);

      if (!user) {
        return {
          success: false,
          message: 'Email tidak ditemukan'
        };
      }

      // Generate new random password
      const newPassword = generatePassword(12);

      // Hash new password
      const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

      // Reset password and activate is_first_login
      const reset = await authRepository.resetPassword(user.user_id, hashedPassword);

      if (!reset) {
        return {
          success: false,
          message: 'Gagal mereset password'
        };
      }

      // Send email with new password
      const emailResult = await sendForgotPasswordEmail(user.email, user.name, newPassword);

      if (!emailResult.success) {
        console.error('[AuthService] Failed to send forgot password email:', emailResult.error);
        // Password sudah direset di database, tapi email gagal dikirim
        return {
          success: false,
          message: 'Password berhasil direset, tapi gagal mengirim email. Silakan hubungi administrator.'
        };
      }

      return {
        success: true,
        message: 'Password baru telah dikirim ke email Anda'
      };
    } catch (error) {
      console.error('[AuthService] Error in forgotPassword:', error);
      throw error;
    }
  }
};
