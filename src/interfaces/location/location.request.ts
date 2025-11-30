import { IJwtPayload } from '../shared/jwt.interface'
import { IPaginationRequest } from '../shared/paginationRequest.interface'
import { ILocationCreationAttributes } from './location.dto'

export interface ILocationCreateRequest extends ILocationCreationAttributes {
  token: string
  latitude: number
  longitude: number
}

export interface ILocationFindAllRequest extends IPaginationRequest {}

export interface ILocationFindDetailRequest {
  jwtPayload: IJwtPayload
  id: number
}

export interface ILocationRemoveRequest extends ILocationFindDetailRequest {
  jwtPayload: IJwtPayload
}

export interface ILocationUpdateRequest {
  token?: string
  latitude?: number
  longitude?: number
  id: number
}
