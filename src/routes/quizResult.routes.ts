import { Router } from 'express'
import { middleware } from '../middlewares'
import { quizResultController } from '../controllers/quizResult'

const router = Router()

router.use(middleware.useAuthorization)
router.get('/', quizResultController.findAll)
router.get('/detail/:id', quizResultController.findByDetail)
router.post('/', quizResultController.create)
router.patch('/', quizResultController.update)
router.delete('/:id', quizResultController.remove)

export default router
