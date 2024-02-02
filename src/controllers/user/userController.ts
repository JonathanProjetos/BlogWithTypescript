import { type Request, type Response } from 'express'
import type UserService from '../../services/user/userService'
import type { IUserController } from '../../interfaces/IUser'

class UserController implements IUserController {
  constructor (private readonly userService: UserService) {}

  public createUser = async (req: Request, res: Response): Promise<Response> => {
    const { email, password, displayName } = req.body

    const user = await this.userService.createUser({ email, password, displayName })

    return res.status(201).json(user)
  }

  public getUserById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params

    const userById = await this.userService.getUserById(id)

    return res.status(200).json(userById)
  }

  public deleteUser = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params
    const { userEmail } = req.body

    const result = await this.userService.deleteUser(id, userEmail as string)

    return res.status(200).json(result)
  }

  public updateUser = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params
    const { email, password, displayName, userEmail } = req.body

    const result = await this.userService.updateUser(
      id,
      userEmail as string,
      { email, password, displayName })

    return res.status(200).json(result)
  }
}

export default UserController
