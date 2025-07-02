import { IJwtPayload } from '../shared/jwt.interface'
import { IPaginationRequest } from '../shared/paginationRequest.interface'

export interface IQuizCreateRequest {
  jwtPayload: IJwtPayload
  title: string
  description?: string
  category: 'personal' | 'general'
}

export interface IQuizFindAllRequest extends IPaginationRequest {
  jwtPayload: IJwtPayload
  category: 'personal' | 'general'
}

export interface IQuizFindDetailRequest {
  jwtPayload: IJwtPayload
  id: number
  category: 'personal' | 'general'
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
