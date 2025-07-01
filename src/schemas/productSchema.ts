import Joi from 'joi'

export const createProductSchema = Joi.object({
  storeId: Joi.number().integer().positive().required(),
  name: Joi.string().max(255).required(),
  description: Joi.string().required(),
  image: Joi.string().uri().optional(),
  basePrice: Joi.number().positive().required(),
  sellingPrice: Joi.number().positive().required(),
  stock: Joi.number().integer().min(0).required(),
  status: Joi.string().valid('active', 'inactive').required(),
  categoryId: Joi.number().integer().positive().optional()
})

export const updateProductSchema = Joi.object({
  name: Joi.string().max(255).optional(),
  description: Joi.string().optional(),
  image: Joi.string().uri().optional(),
  basePrice: Joi.number().positive().optional(),
  sellingPrice: Joi.number().positive().optional(),
  stock: Joi.number().integer().min(0).optional(),
  status: Joi.string().valid('active', 'inactive').optional(),
  categoryId: Joi.number().integer().positive().optional()
})

export const deleteProductSchema = Joi.object({
  id: Joi.number().integer().positive().required()
})

export const findDetailProductSchema = Joi.object({
  id: Joi.number().integer().positive().required()
})

export const findAllProductSchema = Joi.object({
  page: Joi.number().integer().optional(),
  size: Joi.number().integer().optional(),
  search: Joi.string().allow('').optional(),
  pagination: Joi.boolean().optional(),
  startDate: Joi.string().allow('').optional(),
  endDate: Joi.string().allow('').optional()
})
