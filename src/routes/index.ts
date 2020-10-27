import { Router } from 'express'

import autonomousSystem from './autonomousSystem.routes'

const routes = Router()
routes.use('/autonomous-system', autonomousSystem)

export default routes
