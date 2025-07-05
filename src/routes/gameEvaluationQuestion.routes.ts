import { Router } from 'express'
import { middleware } from '../middlewares'
import { gameEvaluationQuestionController } from '../controllers/gameEvaluationQuestion'

const router = Router()

router.use(middleware.useAuthorization)
router.get('/', gameEvaluationQuestionController.findAll)
router.get('/detail/:id', gameEvaluationQuestionController.findByDetail)
router.post('/', gameEvaluationQuestionController.create)
router.patch('/', gameEvaluationQuestionController.update)
router.delete('/:id', gameEvaluationQuestionController.remove)

export default router
