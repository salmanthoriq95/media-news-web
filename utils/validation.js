const Joi = require('joi');

// Auth schemas
const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Email harus valid',
    'any.required': 'Email wajib diisi'
  }),
  password: Joi.string().min(3).required().messages({
    'string.min': 'Password minimal 3 karakter',
    'any.required': 'Password wajib diisi'
  })
});

const changePasswordSchema = Joi.object({
  newPassword: Joi.string().min(6).required().messages({
    'string.min': 'Password baru minimal 6 karakter',
    'any.required': 'Password baru wajib diisi'
  }),
  confirmPassword: Joi.string().valid(Joi.ref('newPassword')).required().messages({
    'any.only': 'Konfirmasi password tidak cocok',
    'any.required': 'Konfirmasi password wajib diisi'
  })
});

// User schemas
const createUserSchema = Joi.object({
  name: Joi.string().min(3).max(255).required().messages({
    'string.min': 'Nama minimal 3 karakter',
    'string.max': 'Nama maksimal 255 karakter',
    'any.required': 'Nama wajib diisi'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Email harus valid',
    'any.required': 'Email wajib diisi'
  })
});

// Article schemas
const createArticleSchema = Joi.object({
  title: Joi.string().min(3).max(500).required().messages({
    'string.min': 'Judul minimal 3 karakter',
    'string.max': 'Judul maksimal 500 karakter',
    'any.required': 'Judul wajib diisi'
  }),
  subtitle: Joi.string().max(1000).allow('', null).optional().messages({
    'string.max': 'Subjudul maksimal 1000 karakter'
  }),
  content: Joi.string().min(10).required().messages({
    'string.min': 'Konten minimal 10 karakter',
    'any.required': 'Konten wajib diisi'
  }),
  image: Joi.string().allow('', null).optional()
});

const updateArticleSchema = Joi.object({
  title: Joi.string().min(3).max(500).optional().messages({
    'string.min': 'Judul minimal 3 karakter',
    'string.max': 'Judul maksimal 500 karakter'
  }),
  subtitle: Joi.string().max(1000).allow('', null).optional().messages({
    'string.max': 'Subjudul maksimal 1000 karakter'
  }),
  content: Joi.string().min(10).optional().messages({
    'string.min': 'Konten minimal 10 karakter'
  }),
  image: Joi.string().allow('', null).optional()
});

module.exports = {
  loginSchema,
  changePasswordSchema,
  createUserSchema,
  createArticleSchema,
  updateArticleSchema
};
