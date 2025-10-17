import { Router } from 'express'
import { statisticController } from '../controllers/statistic'

const router = Router()

router.get('/total', statisticController.total)

export default router
