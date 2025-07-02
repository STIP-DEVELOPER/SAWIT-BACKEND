import Joi from 'joi'
import { jwtPayloadSchema } from './jwtPayloadSchema'

export const quizOptionSchema = Joi.object({
  optionText: Joi.string().required(),
  isCorrect: Joi.boolean().required()
})

export const quizQuestionSchema = Joi.object({
  questionText: Joi.string().required(),
  options: Joi.array().items(quizOptionSchema).min(1).required()
})

export const createQuizSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  title: Joi.string().required(),
  description: Joi.string().optional(),
  items: Joi.array().items(quizQuestionSchema).required().min(1).required()
})

export const updateQuizOptionSchema = Joi.object({
  id: Joi.number().integer().positive().optional(),
  optionText: Joi.string().required(),
  isCorrect: Joi.boolean().required()
})

export const updateQuizQuestionSchema = Joi.object({
  id: Joi.number().integer().positive().optional(),
  questionText: Joi.string().required(),
  options: Joi.array().items(updateQuizOptionSchema).min(1).required()
})

export const updateQuizSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  id: Joi.number().integer().positive().required(),
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  items: Joi.array().items(updateQuizQuestionSchema).required().min(1).optional()
})

export const deleteQuizSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  id: Joi.number().integer().positive().required()
})

export const findDetailQuizSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  id: Joi.number().integer().positive().required()
})

export const findAllQuizSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  page: Joi.number().integer().optional(),
  size: Joi.number().integer().optional(),
  search: Joi.string().allow('').optional(),
  pagination: Joi.boolean().optional(),
  startDate: Joi.string().allow('').optional(),
  endDate: Joi.string().allow('').optional()
})
