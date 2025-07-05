import { Router, type Request, type Response } from 'express'
import { middleware } from '../middlewares'
import { myProfileController } from '../controllers/myProfile'

const router = Router()

router.get(
  '/',
  middleware.useAuthorization,
  async (req: Request, res: Response) => await myProfileController.findMyProfile(req, res)
)

export default router
