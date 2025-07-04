import { IGameEvaluationQuestionCreateRequest } from '../gameEvaluationQuestion/gameEvaluationQuestion.request'
import { IJwtPayload } from '../shared/jwt.interface'
import { IPaginationRequest } from '../shared/paginationRequest.interface'

export interface IPuzzleGameCreateRequest {
  jwtPayload: IJwtPayload
  title: string
  description: string
  image: string
  gameEvaluationQuestion: IGameEvaluationQuestionCreateRequest[]
}

export interface IPuzzleGameFindAllRequest extends IPaginationRequest {
  jwtPayload: IJwtPayload
}

export interface IPuzzleGameFindDetailRequest {
  jwtPayload: IJwtPayload
  id: number
}

export interface IPuzzleGameRemoveRequest extends IPuzzleGameFindDetailRequest {
  jwtPayload: IJwtPayload
}

export interface IPuzzleGameUpdateRequest {
  jwtPayload: IJwtPayload
  id: number
  title?: string
  description?: string
  image?: string
}
