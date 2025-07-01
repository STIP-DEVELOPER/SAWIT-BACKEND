import { Router } from 'express'
import { categoryControllers } from '../controllers/categories'
import { middleware } from '../middlewares'

const router = Router()

router.use(middleware.useAuthorization, middleware.allowRoles('admin'))
router.get('/', categoryControllers.findAll)
router.get('/detail/:id', categoryControllers.findDetail)
router.post('/', categoryControllers.create)
router.patch('/', categoryControllers.update)
router.delete('/:id', categoryControllers.remove)

export default router
