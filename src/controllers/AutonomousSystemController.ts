import { Request, Response } from 'express'
import AutonomousSystem from '../database/entities/AutonomousSystem'

class AutonomousSystemController {
  async index(_request: Request, response: Response): Promise<Response> {
    const autonomousSystems = await AutonomousSystem.find()
    return response.json(autonomousSystems)
  }
}

export default new AutonomousSystemController()
