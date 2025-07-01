import { IBaseModelFields } from '../database/baseModelFields'
import { IPaginationRequest } from '../interfaces/paginationRequest.interface'

export interface IStoreAttributes extends IBaseModelFields {
  name: string
  description: string
  icon: string
  userId: number
  status: 'active' | 'inactive'
  slug: string
}

export type IStoreCreationAttributes = Omit<
  IStoreAttributes,
  'createdAt' | 'updatedAt' | 'id'
>

export interface IStoreCreateRequest {
  name: string
  description: string
  icon: string
  userId: number
  status: 'active' | 'inactive'
  slug: string
}

export interface IStoreFindAllRequest extends IPaginationRequest {}

export interface IStoreFindDetailRequest {
  id: number
}

export interface IStoreRemoveRequest extends IStoreFindDetailRequest {}

export interface IStoreUpdateRequest {
  id: number
  name?: string
  description?: string
  icon?: string
  status?: 'active' | 'inactive'
  slug?: string
}
