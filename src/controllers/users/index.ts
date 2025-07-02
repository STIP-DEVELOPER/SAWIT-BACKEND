import { findAllUser } from './findAll'
import { findDetailUser } from './findDetail'
import { loginUser } from './login'
import { registerUser } from './register'
import { removeUser } from './remove'
import { updateUser } from './update'

export const usersController = {
  login: loginUser,
  register: registerUser,
  findAll: findAllUser,
  findDetail: findDetailUser,
  update: updateUser,
  remove: removeUser
}
