import { findAllUser } from './findAll'
import { findDetailUser } from './findDetail'
import { removeUser } from './remove'
import { updateUser } from './update'

export const usersController = {
  findAll: findAllUser,
  findDetail: findDetailUser,
  update: updateUser,
  remove: removeUser
}
