import Joi from 'joi'
import { jwtPayloadSchema } from './jwtPayloadSchema'

export const createGameEvaluationAnswerSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  question: Joi.string().required(),
  gameId: Joi.number().required(),
  questioId: Joi.number().required(),
  category: Joi.string().valid('puzzle', 'word').default('puzzle').required()
})

export const updateGameEvaluationAnswerSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  id: Joi.number().integer().positive().required(),
  question: Joi.string().optional(),
  gameId: Joi.number().optional(),
  questioId: Joi.number().optional(),
  category: Joi.string().valid('puzzle', 'word').default('puzzle').optional()
})

export const deleteGameEvaluationAnswerSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  id: Joi.number().integer().positive().required()
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
