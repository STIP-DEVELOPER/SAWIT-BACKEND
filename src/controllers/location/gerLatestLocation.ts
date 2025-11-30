import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { DeviceModel } from '../../models/deviceModel'
import { LocationModel } from '../../models/locationModel'
import { handleServerError } from '../../utilities/requestHandler'

interface IDeviceLocation {
  deviceId: string
  deviceName: string
  deviceLatitude: string
  deviceLongitude: string
}

export const getAllDeviceLatestLocations = async (req: Request, res: Response) => {
  try {
    const devices = await DeviceModel.findAll({
      attributes: ['id', 'name'],
      include: [
        {
          model: LocationModel,
          as: 'locations',
          attributes: ['latitude', 'longitude'],
          limit: 1,
          order: [['created_at', 'DESC']],
          separate: true
        }
      ],
      where: { deleted: false },
      order: [['name', 'ASC']]
    })

    const result: IDeviceLocation[] = devices.map((device: any) => ({
      deviceId: device.id!.toString(),
      deviceName: device.name,
      deviceLatitude: device.locations?.[0]?.latitude || null,
      deviceLongitude: device.locations?.[0]?.longitude || null
    }))

    return res.status(StatusCodes.OK).json(ResponseData.success({ data: result }))
  } catch (serverError) {
    return handleServerError(res, serverError)
  }
}
