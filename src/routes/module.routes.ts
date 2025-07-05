import { Router } from 'express'
import { middleware } from '../middlewares'
import { moduleController } from '../controllers/module'

const router = Router()

router.use(middleware.useAuthorization)
router.get('/', moduleController.findAll)
router.get('/detail/:id', moduleController.findByDetail)
router.post('/', moduleController.create)
router.patch('/', moduleController.update)
router.delete('/:id', moduleController.remove)

export default router
