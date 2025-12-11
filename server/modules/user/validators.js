import Joi from 'joi';
import { isValidEmail, sanitizeString } from '../../security/security.js';

/**
 * User Validators - Validation schemas dengan security checks
 */
export const createUserSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(255)
    .trim()
    .custom((value, helpers) => {
      // Sanitize name input
      const sanitized = sanitizeString(value);
      // Check for dangerous patterns
      if (/<script|javascript:|onerror=/i.test(value)) {
        return helpers.error('any.invalid');
      }
      return sanitized;
    })
    .required()
    .messages({
      'string.min': 'Nama minimal 3 karakter',
      'string.max': 'Nama maksimal 255 karakter',
      'any.required': 'Nama wajib diisi',
      'any.invalid': 'Nama mengandung karakter yang tidak diizinkan'
    }),
  email: Joi.string()
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
    .required()
    .messages({
      'string.email': 'Email harus valid',
      'string.max': 'Email terlalu panjang',
      'any.required': 'Email wajib diisi',
      'any.invalid': 'Email mengandung karakter yang tidak diizinkan'
    })
});
