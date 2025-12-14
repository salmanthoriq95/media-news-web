import Joi from 'joi';

/**
 * Validation schema untuk update config
 */
export const updateConfigSchema = Joi.object({
  web_name: Joi.string().max(255).required(),
  web_icon: Joi.string().max(500).allow(null, ''),
  web_logo: Joi.string().max(500).allow(null, '')
});
