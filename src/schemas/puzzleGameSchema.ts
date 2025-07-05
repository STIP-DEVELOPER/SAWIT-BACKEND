import Joi from 'joi'
import { jwtPayloadSchema } from './jwtPayloadSchema'

const gameEvaluationQuestionItemSchema = Joi.object({
  question: Joi.string().required(),
  category: Joi.string().valid('puzzle', 'word').default('puzzle')
})

export const createPuzzleGameSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  title: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string().optional(),
  gameEvaluationQuestion: Joi.array().items(gameEvaluationQuestionItemSchema).optional()
})

export const updatePuzzleGameSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  id: Joi.number().integer().positive().required(),
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  image: Joi.string().optional(),
  gameEvaluationQuestion: Joi.array().items(gameEvaluationQuestionItemSchema).optional()
})

export const deletePuzzleGameSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  id: Joi.number().integer().positive().required()
})

export const findDetailPuzzleGameSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  id: Joi.number().integer().positive().required()
})

export const findAllPuzzleGameSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  page: Joi.number().integer().optional(),
  size: Joi.number().integer().optional(),
  search: Joi.string().allow('').optional(),
  pagination: Joi.boolean().optional(),
  startDate: Joi.string().allow('').optional(),
  endDate: Joi.string().allow('').optional()
})
