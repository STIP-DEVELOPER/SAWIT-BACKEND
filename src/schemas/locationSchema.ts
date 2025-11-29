import Joi from 'joi'
import { jwtPayloadSchema } from './jwtPayloadSchema'

export const createLocationSchema = Joi.object({
  deviceId: Joi.number().integer().positive().required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required()
})

export const findDetailLocationSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  id: Joi.number().integer().positive().required()
})

export const findAllLocationSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  page: Joi.number().integer().optional(),
  size: Joi.number().integer().optional(),
  search: Joi.string().allow('').optional(),
  pagination: Joi.boolean().optional(),
  startDate: Joi.string().allow('').optional(),
  endDate: Joi.string().allow('').optional(),
  status: Joi.string().valid('active', 'inactive', 'maintenance').optional()
})
