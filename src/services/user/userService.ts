import type IUser from '../../interfaces/IUser'
import type UserODM from '../../models/user/userODM'
import { validateBodyUser } from '../../middlewares/joiBodyUser'
import encripty from '../../helper/encrypt'

class UserService {
  constructor (private readonly userODM: UserODM) {}

  create = async (body: IUser): Promise<IUser> => {
    const checkBody = validateBodyUser(body)

    const isUser = await this.userODM.getUserByEmail(body.email)

    if (isUser !== null) throw new Error('409|user already registered')

    const password = encripty(checkBody.password)

    checkBody.password = password

    const user = await this.userODM.create(checkBody)
    return user
  }

  getUserById = async (id: string): Promise<IUser | null> => {
    const isUser = await this.userODM.getUserById(id)

    if (isUser === undefined) throw new Error('404|User not found')

    return isUser
  }
}

export default UserService
