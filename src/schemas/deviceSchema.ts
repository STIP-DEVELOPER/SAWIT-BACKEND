import Joi from 'joi'
import { jwtPayloadSchema } from './jwtPayloadSchema'

export const createDeviceSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  name: Joi.string().required(),
  status: Joi.string().valid('active', 'inactive', 'maintenance').required(),
  fertilizerVolume: Joi.number().integer().positive().required(),
  fertilizeType: Joi.string()
    .valid('NPK', 'UREA', 'DOLOMIT', 'MOP', 'KIESERITE', 'ROCK PHOSPHATE')
    .required(),
  speed: Joi.number().integer().positive().required()
})

export const updateDeviceSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  id: Joi.number().integer().positive().required(),
  name: Joi.string().optional(),
  status: Joi.string().valid('active', 'inactive', 'maintenance').optional(),
  fertilizerVolume: Joi.number().integer().positive().optional(),
  fertilizeType: Joi.string()
    .valid('NPK', 'UREA', 'DOLOMIT', 'MOP', 'KIESERITE', 'ROCK PHOSPHATE')
    .optional(),
  speed: Joi.number().integer().positive().optional()
})

export const removeDeviceSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  id: Joi.number().integer().positive().required()
})

export const findDetailDeviceSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  id: Joi.number().integer().positive().required()
})

export const findAllDeviceSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  page: Joi.number().integer().optional(),
  size: Joi.number().integer().optional(),
  search: Joi.string().allow('').optional(),
  pagination: Joi.boolean().optional(),
  startDate: Joi.string().allow('').optional(),
  endDate: Joi.string().allow('').optional(),
  status: Joi.string().valid('active', 'inactive', 'maintenance').optional()
})
