import { type Request, type Response } from 'express'
import type AuthService from '../../services/auth/authService'

class AuthController {
  constructor (private readonly authService: AuthService) {}

  public login = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body
    const token = await this.authService.login({ email, password })
    return res.status(200).json({ token })
  }
}

export default AuthController
