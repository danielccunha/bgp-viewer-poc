import { Request, Response } from 'express'

import * as service from '../services/AutonomousSystemService'

class AutonomousSystemController {
  async index(_request: Request, response: Response): Promise<Response> {
    const autonomousSystems = await service.fetchAll()
    return response.json(autonomousSystems)
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const autonomousSystem = await service.findById(id)

    if (!autonomousSystem) {
      return response
        .status(404)
        .json({ error: 'Autonomous System not found.' })
    }

    return response.json(autonomousSystem)
  }
}

export default new AutonomousSystemController()
