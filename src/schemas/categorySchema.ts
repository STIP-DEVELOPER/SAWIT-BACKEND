import Joi from 'joi'

export const createCategorySchema = Joi.object({
  storeId: Joi.number().integer().positive().required(),
  name: Joi.string().max(255).required()
})

export const updateCategorySchema = Joi.object({
  id: Joi.number().integer().positive().required(),
  name: Joi.string().max(255).optional()
})

export const deleteCategorySchema = Joi.object({
  id: Joi.number().integer().positive().required()
})

export const findDetailCategorySchema = Joi.object({
  id: Joi.number().integer().positive().required()
})

export const findAllStoreSchema = Joi.object({
  page: Joi.number().integer().optional(),
  size: Joi.number().integer().optional(),
  search: Joi.string().allow('').optional(),
  pagination: Joi.boolean().optional(),
  startDate: Joi.string().allow('').optional(),
  endDate: Joi.string().allow('').optional()
})
