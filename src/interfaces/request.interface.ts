import { type Request } from 'express'
import { IJwtPayload } from './jwt.interface'

export interface IRequest extends Request {
  user?: IJwtPayload
}
