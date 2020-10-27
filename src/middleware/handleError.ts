/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express'

export default (
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction
): void => {
  response.status(500).json({
    name: error.name,
    message: error?.message,
    stackTrace: error?.stack
  })
}
