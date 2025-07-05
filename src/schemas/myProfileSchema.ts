import Joi from 'joi'
import { jwtPayloadSchema } from './jwtPayloadSchema'

export const findDetailMyProfileSchema = Joi.object({
  jwtPayload: jwtPayloadSchema
})

export const updateMyProfileSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  name: Joi.string().allow('').min(3).max(30).optional(),
  password: Joi.string().allow('').min(6).max(128).optional(),
  email: Joi.string().allow('').min(6).max(128).optional(),
  role: Joi.string().allow('').valid('admin', 'superAdmin', 'user').optional().optional()
})
