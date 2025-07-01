import { findAllUser } from './findAll'
import { findDetailUser } from './findDetail'
import { loginUser } from './login'
import { registerUser } from './register'
import { removeUser } from './remove'
import { updateUser } from './update'

export const UsersController = {
  loginUser,
  registerUser,
  findAllUser,
  findDetailUser,
  updateUser,
  removeUser
}
