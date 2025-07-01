import Joi from 'joi'

export const userLoginSchema = Joi.object({
  whatsappNumber: Joi.string().required(),
  password: Joi.string().required()
})

export const userRegistrationSchema = Joi.object({
  name: Joi.string().required(),
  whatsappNumber: Joi.string().required(),
  email: Joi.string().required(),
  role: Joi.string().valid('superAdmin', 'admin', 'user').required(),
  password: Joi.string().min(6).required()
})

export const findAllUsersSchema = Joi.object({
  page: Joi.number().integer().min(0).default(0).optional(),
  size: Joi.number().integer().min(1).default(10).optional(),
  search: Joi.string().allow('').optional(),
  pagination: Joi.boolean().default(true).optional()
})

export const findDetailUserSchema = Joi.object({
  id: Joi.string().required()
})

export const userSchema = Joi.object({
  id: Joi.string().required(),
  whatsappNumber: Joi.string().required(),
  name: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(6).max(128).required(),
  role: Joi.string().valid('superAdmin', 'admin', 'user').required()
})

export const updateUserSchema = Joi.object({
  id: Joi.string().required(),
  whatsappNumber: Joi.string().optional(),
  name: Joi.string().min(3).max(30).optional(),
  password: Joi.string().min(6).max(128).optional(),
  role: Joi.string().valid('superAdmin', 'admin', 'user').optional()
})
