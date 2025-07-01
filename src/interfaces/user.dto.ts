import { IBaseModelFields } from '../database/baseModelFields'
import { IPaginationRequest } from '../interfaces/paginationRequest.interface'

export interface UserAttributes extends IBaseModelFields {
  name: string
  whatsappNumber: string
  email: string
  password: string
  role: 'superAdmin' | 'admin' | 'user'
}

export type UserCreationAttributes = Omit<
  UserAttributes,
  'createdAt' | 'updatedAt' | 'id'
>

export interface IUserUpdateRequest {
  id: number
  whatsappNumber?: string
  name?: string
  email?: string
  password?: string
  role?: 'superAdmin' | 'admin' | 'user' | string
}

export interface IUserFindAllRequest extends IPaginationRequest {}

export interface IUserFindDetailRequest {
  id: number
}

export interface IUserRemoveRequest extends IUserFindDetailRequest {}

export interface IUserLoginRequest {
  whatsappNumber: string
  password: string
}

export interface IUserRegisterRequest {
  name: string
  whatsappNumber: string
  email: string
  password: string
  role: 'superAdmin' | 'admin' | 'user'
}
