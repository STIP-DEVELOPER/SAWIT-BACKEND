import { type RequestHandler } from 'express'
import { IRequest } from '../interfaces/request.interface'

export function allowRoles(...roles: string[]): RequestHandler {
  return (req: IRequest, res, next) => {
    const user = req.body.user

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    if (!roles.includes(user.userRole)) {
      return res.status(403).json({ message: 'Forbidden: Insufficient role' })
    }
    next()
  }
}
