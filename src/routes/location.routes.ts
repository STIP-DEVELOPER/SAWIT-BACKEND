import { Router } from 'express'
import { locationController } from '../controllers/location'

const router = Router()

router.get('/', locationController.findAll)
router.get('/detail/:id', locationController.findDetail)
router.get('/latest', locationController.getAllLatestLocations)
router.post('/', locationController.create)

export default router
