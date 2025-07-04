import { Router } from 'express'
import { middleware } from '../middlewares'
import { puzzleGameController } from '../controllers/puzzleGame'

const router = Router()

router.use(middleware.useAuthorization)
router.get('/', puzzleGameController.findAll)
router.get('/detail/:id', puzzleGameController.findByDetail)
router.post('/', puzzleGameController.create)
router.patch('/', puzzleGameController.update)
router.delete('/:id', puzzleGameController.remove)

export default router
