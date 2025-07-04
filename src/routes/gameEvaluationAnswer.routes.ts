import { Router } from 'express'
import { middleware } from '../middlewares'
import { gameEvaluationAnswerController } from '../controllers/gameEvaluationAnswer'

const router = Router()

router.use(middleware.useAuthorization)
router.get('/', gameEvaluationAnswerController.findAll)
router.get('/detail/:id', gameEvaluationAnswerController.findByDetail)
router.post('/', gameEvaluationAnswerController.create)

export default router
