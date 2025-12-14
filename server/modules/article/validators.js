import Joi from 'joi';

/**
 * Article Validators - Validation schemas untuk Article Module
 */
export const createArticleSchema = Joi.object({
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
  image: Joi.string().allow('', null).optional(),
  is_highlight: Joi.boolean().optional().default(false)
});

export const updateArticleSchema = Joi.object({
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
  image: Joi.string().allow('', null).optional(),
  is_highlight: Joi.boolean().optional()
});
