import { IBaseModelFields } from '../database/baseModelFields'
import { IPaginationRequest } from '../interfaces/paginationRequest.interface'

export interface ICategoryAttributes extends IBaseModelFields {
  storeId: number
  name: string
}

export type ICategoryCreationAttributes = Omit<
  ICategoryAttributes,
  'createdAt' | 'updatedAt' | 'id'
>

export interface ICategoryCreateRequest {
  storeId: number
  name: string
}

export interface ICategoryFindAllRequest extends IPaginationRequest {}

export interface ICategoryFindDetailRequest {
  id: number
}

export interface ICategoryRemoveRequest extends ICategoryFindDetailRequest {}

export interface ICategoryUpdateRequest {
  id: number
  name?: string
}
