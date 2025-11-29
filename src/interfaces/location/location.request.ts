import { IJwtPayload } from '../shared/jwt.interface'
import { IPaginationRequest } from '../shared/paginationRequest.interface'

export interface ILocationCreateRequest {
  deviceId: number
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
  deviceId?: number
  latitude?: number
  longitude?: number
  id: number
}
