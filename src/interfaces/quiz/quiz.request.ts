import { IPaginationRequest } from '../shared/paginationRequest.interface'

export interface IQuizCreateRequest {
  title: string
  description?: string
}

export interface IQuizFindAllRequest extends IPaginationRequest {}

export interface IQuizFindDetailRequest {
  id: number
}

export interface IQuizRemoveRequest extends IQuizFindDetailRequest {}

export interface IQuizUpdateRequest {
  id: number
  title: string
  description?: string
}
