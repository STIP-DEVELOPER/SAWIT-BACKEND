import { Router } from 'express'
import { middleware } from '../middlewares'
import { quizController } from '../controllers/quiz'

const router = Router()

router.use(middleware.useAuthorization)
router.get('/', quizController.findAll)
router.get('/detail/:id', quizController.findByDetail)
router.post('/', quizController.create)
router.patch('/', quizController.update)
router.delete('/:id', quizController.remove)

export default router
