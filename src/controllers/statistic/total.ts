import { type Request, type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { handleServerError } from '../../utilities/requestHandler'
import { UserModel } from '../../models/user'
import { DeviceModel } from '../../models/deviceModel'

export const total = async (req: Request, res: Response): Promise<Response> => {
  try {
    const totalAdmin = await UserModel.count({
      where: {
        deleted: 0,
        role: 'admin'
      }
    })

    const totalSuperAdmin = await UserModel.count({
      where: {
        deleted: 0,
        role: 'superAdmin'
      }
    })

    const totalDevice = await DeviceModel.count({
      where: {
        deleted: 0
      }
    })

    const payload = {
      totalAdmin,
      totalSuperAdmin,
      totalDevice
    }

    const response = ResponseData.success({
      data: payload
    })

    return res.status(StatusCodes.OK).json(response)
  } catch (serverError) {
    return handleServerError(res, serverError)
  }
}
