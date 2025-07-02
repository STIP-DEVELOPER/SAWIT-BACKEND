import { IJwtPayload } from '../shared/jwt.interface'
import { IPaginationRequest } from '../shared/paginationRequest.interface'

export interface IQuizCreateRequest {
  jwtPayload: IJwtPayload
  title: string
  description?: string
}

export interface IQuizFindAllRequest extends IPaginationRequest {
  jwtPayload: IJwtPayload
}

export interface IQuizFindDetailRequest {
  jwtPayload: IJwtPayload
  id: number
}

export interface IQuizRemoveRequest extends IQuizFindDetailRequest {
  jwtPayload: IJwtPayload
}

export interface IQuizUpdateRequest {
  jwtPayload: IJwtPayload
  id: number
  title: string
  description?: string
}
