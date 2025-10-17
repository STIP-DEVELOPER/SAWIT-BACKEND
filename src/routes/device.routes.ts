import { Router } from 'express'
import { middleware } from '../middlewares'
import { deviceController } from '../controllers/device'

const router = Router()

router.use(middleware.useAuthorization)
router.get('/', deviceController.findAll)
router.get('/detail/:id', deviceController.findByDetail)
router.post('/', deviceController.create)
router.patch('/', deviceController.update)
router.delete('/:id', deviceController.remove)

export default router
