import { IJwtPayload } from '../shared/jwt.interface'
import { IPaginationRequest } from '../shared/paginationRequest.interface'

export interface IGameEvaluationAnswerCreateRequest {
  jwtPayload: IJwtPayload
  questionId: number
  gameId: number
  userId: number
  answer: string
  category: 'puzzle' | 'word'
}

export interface IGameEvaluationAnswerFindAllRequest extends IPaginationRequest {
  jwtPayload: IJwtPayload
}

export interface IGameEvaluationAnswerFindDetailRequest {
  jwtPayload: IJwtPayload
  id: number
}

export interface IGameEvaluationAnswerRemoveRequest
  extends IGameEvaluationAnswerFindDetailRequest {
  jwtPayload: IJwtPayload
}

export interface IGameEvaluationAnswerUpdateRequest {
  jwtPayload: IJwtPayload
  id: number
  questionId?: number
  gameId?: number
  answer?: string
  category?: 'puzzle' | 'word'
}
