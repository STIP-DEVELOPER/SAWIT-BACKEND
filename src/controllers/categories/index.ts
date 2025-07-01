import { createCategory } from './create'
import { findAllCategory } from './findAll'
import { findDetailCategory } from './findDetail'
import { removeCategory } from './remove'
import { updateCategory } from './update'

export const categoryControllers = {
  findAll: findAllCategory,
  findDetail: findDetailCategory,
  create: createCategory,
  update: updateCategory,
  remove: removeCategory
}
