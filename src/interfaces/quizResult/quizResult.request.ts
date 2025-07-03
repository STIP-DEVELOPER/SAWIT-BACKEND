import { IJwtPayload } from '../shared/jwt.interface'
import { IPaginationRequest } from '../shared/paginationRequest.interface'

export interface IQuizResultCreateRequest {
  jwtPayload: IJwtPayload
  userId: number
  quizId: number
  score: number
}

export interface IQuizResultFindAllRequest extends IPaginationRequest {
  jwtPayload: IJwtPayload
}

export interface IQuizResultFindDetailRequest {
  jwtPayload: IJwtPayload
  id: number
}

export interface IQuizResultRemoveRequest extends IQuizResultFindDetailRequest {
  jwtPayload: IJwtPayload
}

export interface IQuizResultUpdateRequest {
  jwtPayload: IJwtPayload
  id: number
  userId?: number
  quizId?: number
  score?: number
}
