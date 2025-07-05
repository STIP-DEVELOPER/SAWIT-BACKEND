import { IJwtPayload } from '../shared/jwt.interface'
import { IPaginationRequest } from '../shared/paginationRequest.interface'

export interface IModuleCreateRequest {
  jwtPayload: IJwtPayload
  title: string
  description: string
  image?: string
}

export interface IModuleFindAllRequest extends IPaginationRequest {
  jwtPayload: IJwtPayload
}

export interface IModuleFindDetailRequest {
  jwtPayload: IJwtPayload
  id: number
}

export interface IModuleRemoveRequest extends IModuleFindDetailRequest {
  jwtPayload: IJwtPayload
}

export interface IModuleUpdateRequest {
  jwtPayload: IJwtPayload
  id: number
  title?: string
  description?: string
  image?: string
}
