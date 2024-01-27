import { type Request, type Response } from 'express'

interface IUserController {
  create?: (req: Request, res: Response) => void
  getUserById?: (req: Request, res: Response) => void
}

export default IUserController
