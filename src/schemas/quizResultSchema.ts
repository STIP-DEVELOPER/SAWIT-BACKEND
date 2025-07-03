import Joi from 'joi'
import { jwtPayloadSchema } from './jwtPayloadSchema'

export const createQuizResultSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  quizId: Joi.number().integer().positive().required(),
  score: Joi.number().integer().optional()
})

export const updateQuizResultSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  id: Joi.number().integer().positive().required(),
  quizId: Joi.number().integer().positive().optional(),
  score: Joi.number().integer().optional()
})

export const deleteQuizResultSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  id: Joi.number().integer().positive().required()
})

export const findDetailQuizResultSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  id: Joi.number().integer().positive().required()
})

export const findAllQuizResultSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  page: Joi.number().integer().optional(),
  size: Joi.number().integer().optional(),
  search: Joi.string().allow('').optional(),
  pagination: Joi.boolean().optional(),
  startDate: Joi.string().allow('').optional(),
  endDate: Joi.string().allow('').optional()
})
