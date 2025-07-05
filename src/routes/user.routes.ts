import { Router, type Request, type Response } from 'express'
import { usersController } from '../controllers/users'
import { middleware } from '../middlewares'

const router = Router()

router.get(
  '/',
  middleware.useAuthorization,
  async (req: Request, res: Response) => await usersController.findAll(req, res)
)

router.get(
  '/detail/:userId',
  middleware.useAuthorization,
  async (req: Request, res: Response) => await usersController.findDetail(req, res)
)

router.patch(
  '/',
  async (req: Request, res: Response) => await usersController.update(req, res)
)

router.delete(
  '/',
  async (req: Request, res: Response) => await usersController.remove(req, res)
)

export default router
