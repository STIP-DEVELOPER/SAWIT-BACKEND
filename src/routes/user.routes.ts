/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router, type Request, type Response } from 'express'
import { UsersController } from '../controllers/users'
import { middleware } from '../middlewares'

const router = Router()

router.get(
  '/',
  middleware.useAuthorization,
  async (req: Request, res: Response) => await UsersController.findAllUser(req, res)
)

router.get(
  '/detail/:userId',
  middleware.useAuthorization,
  async (req: Request, res: Response) => await UsersController.findDetailUser(req, res)
)

router.patch(
  '/',
  async (req: Request, res: Response) => await UsersController.updateUser(req, res)
)

router.delete(
  '/',
  async (req: Request, res: Response) => await UsersController.removeUser(req, res)
)

router.post(
  '/login',
  async (req: Request, res: Response) => await UsersController.loginUser(req, res)
)

router.post(
  '/register',
  async (req: Request, res: Response) => await UsersController.registerUser(req, res)
)

export default router
