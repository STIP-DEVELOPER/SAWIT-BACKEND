import { type Request, type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { handleServerError } from '../../utilities/requestHandler'

export const mainApp = async (req: Request, res: Response): Promise<Response> => {
  try {
    for (let i = 0; i < 10000; i++) {
      console.log('loop' + i)
    }

    console.log(res.locals)

    const data = {
      aboutMe: 'Welcome to EVERYTOKO API'
    }
    const response = ResponseData.success({
      data,
      executionTime: res.locals.executionTime
    })
    return res.status(StatusCodes.OK).json(response)
  } catch (serverError) {
    return handleServerError(res, serverError)
  }
}
