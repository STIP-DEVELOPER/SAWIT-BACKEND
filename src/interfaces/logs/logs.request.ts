import { IJwtPayload } from '../shared/jwt.interface'
import { IPaginationRequest } from '../shared/paginationRequest.interface'

export interface ILogCreateRequest {
  deviceId: number
  deviceName: string
  message: string
  level: 'info' | 'warning' | 'error'
}

export interface ILogFindAllRequest extends IPaginationRequest {}

export interface ILogFindDetailRequest {
  jwtPayload: IJwtPayload
  id: number
}

export interface ILogRemoveRequest extends ILogFindDetailRequest {
  jwtPayload: IJwtPayload
}

export interface ILogUpdateRequest {
  deviceId?: number
  deviceName?: string
  message?: string
  level?: 'info' | 'warning' | 'error'
  id: number
}
