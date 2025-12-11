import Joi from 'joi';
import { isValidEmail, isStrongPassword } from '../../security/security.js';

/**
 * Auth Validators - Validation schemas dengan security checks
 */

// Custom email validator dengan sanitasi
const emailValidator = Joi.string()
  .email()
  .max(255)
  .trim()
  .lowercase()
  .custom((value, helpers) => {
    if (!isValidEmail(value)) {
      return helpers.error('any.invalid');
    }
    return value;
  })
  .messages({
    'string.email': 'Email harus valid',
    'string.max': 'Email terlalu panjang',
    'any.required': 'Email wajib diisi',
    'any.invalid': 'Email mengandung karakter yang tidak diizinkan'
  });

// Custom password validator dengan strength check
const passwordValidator = (minLength = 8) => Joi.string()
  .min(minLength)
  .max(128) // Prevent DoS via bcrypt
  .custom((value, helpers) => {
    // For change password, check strength
    if (minLength >= 8 && !isStrongPassword(value)) {
      return helpers.error('password.weak');
    }
    return value;
  })
  .messages({
    'string.min': `Password minimal ${minLength} karakter`,
    'string.max': 'Password terlalu panjang (maksimal 128 karakter)',
    'any.required': 'Password wajib diisi',
    'password.weak': 'Password harus mengandung minimal 8 karakter, kombinasi huruf dan angka'
  });

export const loginSchema = Joi.object({
  email: emailValidator.required(),
  password: Joi.string().min(3).max(128).required().messages({
    'string.min': 'Password minimal 3 karakter',
    'string.max': 'Password terlalu panjang',
    'any.required': 'Password wajib diisi'
  })
});

export const changePasswordSchema = Joi.object({
  newPassword: passwordValidator(8).required(),
  confirmPassword: Joi.string()
    .valid(Joi.ref('newPassword'))
    .required()
    .messages({
      'any.only': 'Konfirmasi password tidak cocok',
      'any.required': 'Konfirmasi password wajib diisi'
    })
});

export const forgotPasswordSchema = Joi.object({
  email: emailValidator.required()
});
