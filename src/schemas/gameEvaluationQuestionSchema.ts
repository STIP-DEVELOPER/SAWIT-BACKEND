import Joi from 'joi'
import { jwtPayloadSchema } from './jwtPayloadSchema'

export const createGameEvaluationQuestionSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  question: Joi.string().required(),
  gameId: Joi.number().required(),
  category: Joi.string().valid('puzzle', 'word').default('puzzle').required()
})

export const updateGameEvaluationQuestionSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  id: Joi.number().integer().positive().required(),
  question: Joi.string().optional(),
  gameId: Joi.number().optional(),
  category: Joi.string().valid('puzzle', 'word').default('puzzle').optional()
})

export const deleteGameEvaluationQuestionSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  id: Joi.number().integer().positive().required()
})

export const findDetailGameEvaluationQuestionSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  id: Joi.number().integer().positive().required()
})

export const findAllGameEvaluationQuestionSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  page: Joi.number().integer().optional(),
  size: Joi.number().integer().optional(),
  search: Joi.string().allow('').optional(),
  pagination: Joi.boolean().optional(),
  startDate: Joi.string().allow('').optional(),
  endDate: Joi.string().allow('').optional()
})
