import { Router, type Request, type Response } from 'express'
import { usersController } from '../controllers/users'

const router = Router()

router.post(
  '/login',
  async (req: Request, res: Response) => await usersController.login(req, res)
)

router.post(
  '/register',
  async (req: Request, res: Response) => await usersController.register(req, res)
)

export default router
