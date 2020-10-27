import { Router } from 'express'

import controller from '../controllers/AutonomousSystemController'

const routes = Router()
routes.get('/', controller.index)

export default routes
