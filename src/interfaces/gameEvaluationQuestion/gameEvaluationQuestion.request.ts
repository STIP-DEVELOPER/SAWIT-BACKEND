import { IJwtPayload } from '../shared/jwt.interface'
import { IPaginationRequest } from '../shared/paginationRequest.interface'

export interface IGameEvaluationQuestionCreateRequest {
  jwtPayload: IJwtPayload
  question: string
  gameId: number
  category: 'puzzle' | 'word'
}

export interface IGameEvaluationQuestionFindAllRequest extends IPaginationRequest {
  jwtPayload: IJwtPayload
}

export interface IGameEvaluationQuestionFindDetailRequest {
  jwtPayload: IJwtPayload
  id: number
}

export interface IGameEvaluationQuestionRemoveRequest
  extends IGameEvaluationQuestionFindDetailRequest {
  jwtPayload: IJwtPayload
}

export interface IGameEvaluationQuestionUpdateRequest {
  jwtPayload: IJwtPayload
  id: number
  question?: string
  gameId?: number
  category?: 'puzzle' | 'word'
}
