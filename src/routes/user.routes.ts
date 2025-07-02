/* eslint-disable @typescript-eslint/no-misused-promises */
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

router.post(
  '/login',
  async (req: Request, res: Response) => await usersController.login(req, res)
)

router.post(
  '/register',
  async (req: Request, res: Response) => await usersController.register(req, res)
)

export default router
