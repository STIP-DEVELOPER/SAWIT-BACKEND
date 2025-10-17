import { IJwtPayload } from '../shared/jwt.interface'
import { IPaginationRequest } from '../shared/paginationRequest.interface'

export interface IDeviceCreateRequest {
  jwtPayload: IJwtPayload
  name: string
  status: 'active' | 'inactive' | 'maintenance'
  fertilizerVolume: number
  fertilizeType: 'NPK' | 'UREA' | 'DOLOMIT' | 'MOP' | 'KIESERITE' | 'ROCK PHOSPHATE'
  speed: number
  token: string
}

export interface IDeviceFindAllRequest extends IPaginationRequest {
  jwtPayload: IJwtPayload
  status: 'active' | 'inactive' | 'maintenance'
}

export interface IDeviceFindDetailRequest {
  jwtPayload: IJwtPayload
  id: number
}

export interface IDeviceRemoveRequest extends IDeviceFindDetailRequest {
  jwtPayload: IJwtPayload
}

export interface IDeviceUpdateRequest {
  jwtPayload: IJwtPayload
  id: number
  name?: string
  status?: 'active' | 'inactive' | 'maintenance'
  fertilizerVolume?: number
  fertilizeType?: 'NPK' | 'UREA' | 'DOLOMIT' | 'MOP' | 'KIESERITE' | 'ROCK PHOSPHATE'
  speed?: number
  token?: string
}
