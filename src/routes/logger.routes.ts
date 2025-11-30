import { Router } from 'express'
import { loggerController } from '../controllers/logger'

const router = Router()

router.get('/', loggerController.findAll)
router.post('/', loggerController.create)

export default router
