import { IJwtPayload } from '../shared/jwt.interface'
import { IPaginationRequest } from '../shared/paginationRequest.interface'

export interface IUserUpdateRequest {
  id: number
  name?: string
  email?: string
  password?: string
  role?: 'superAdmin' | 'admin' | string
}

export interface IUserFindAllRequest extends IPaginationRequest {}

export interface IUserFindDetailRequest {
  id: number
}

export interface IUserRemoveRequest extends IUserFindDetailRequest {}

export interface IUserLoginRequest {
  email: string
  password: string
}

export interface IUserRegisterRequest {
  name: string
  email: string
  password: string
  role: 'superAdmin' | 'admin'
}

export interface IMyProfile {
  jwtPayload: IJwtPayload
  name: string
  email: string
}
