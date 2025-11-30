import Joi from 'joi'
import { jwtPayloadSchema } from './jwtPayloadSchema'

export const createLoggerSchema = Joi.object({
  token: Joi.string().required(),
  message: Joi.string().required(),
  level: Joi.string().valid('info', 'warning', 'error').required()
})

export const findDetailLoggerSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  id: Joi.string().required()
})

export const findAllLoggerSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  page: Joi.string().optional(),
  size: Joi.string().optional(),
  search: Joi.string().allow('').optional(),
  pagination: Joi.boolean().optional(),
  startDate: Joi.string().allow('').optional(),
  endDate: Joi.string().allow('').optional(),
  level: Joi.string().valid('info', 'warning', 'error').optional()
})
