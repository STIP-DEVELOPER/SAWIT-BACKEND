import Joi from 'joi'
import { jwtPayloadSchema } from './jwtPayloadSchema'

const singleAnswerSchema = Joi.object({
  answer: Joi.string().required(),
  gameId: Joi.number().required(),
  questionId: Joi.number().required(),
  category: Joi.string().valid('puzzle', 'word').required()
})

export const createManyGameEvaluationAnswerSchema = Joi.object({
  jwtPayload: jwtPayloadSchema.required(),
  answers: Joi.array().items(singleAnswerSchema).min(1).required()
})

export const findDetailGameEvaluationAnswerSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  id: Joi.number().integer().positive().required()
})

export const findAllGameEvaluationAnswerSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  page: Joi.number().integer().optional(),
  size: Joi.number().integer().optional(),
  search: Joi.string().allow('').optional(),
  pagination: Joi.boolean().optional(),
  startDate: Joi.string().allow('').optional(),
  endDate: Joi.string().allow('').optional()
})
