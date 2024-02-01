import type { IUser } from '../../interfaces/IUser'
import type UserODM from '../../models/user/userODM'
import { validateBodyUser } from '../../middlewares/joiBodyUser'
import encripty from '../../helper/encrypt'

class UserService {
  constructor (private readonly userODM: typeof UserODM) {}

  public createUser = async (body: IUser): Promise<IUser> => {
    console.log(body)

    let { email, password, displayName } = validateBodyUser(body)

    const isUser = await this.userODM.getUserByEmail(body.email)

    if (isUser !== null) throw new Error('409|user already registered')

    const encryptPassword = encripty(password)

    password = encryptPassword

    const user = await this.userODM.create({
      email,
      password,
      displayName
    })
    return user
  }

  public getUserById = async (id: string): Promise<IUser | null> => {
    const isUser = await this.userODM.getUserById(id)

    if (isUser === undefined) throw new Error('404|User not found')

    return isUser
  }

  public getUserAndDelete = async (id: string, userEmail: string): Promise<IUser | null> => {
    if (userEmail === undefined) throw new Error('401|Unauthorized')

    const isUser = await this.userODM.getUserByEmail(userEmail)

    if (isUser === null) throw new Error('404|User not found')

    if (isUser.id !== id) throw new Error('401|Unauthorized')

    const resolve = await this.userODM.deleteUser(id)

    return resolve
  }

  public getUserAndUpdate = async (id: string, userEmail: string, body: IUser): Promise<IUser | null> => {
    let { email, password, displayName } = validateBodyUser(body)

    if (userEmail === undefined) throw new Error('401|Unauthorized')

    const isUser = await this.userODM.getUserByEmail(userEmail)

    if (isUser === null) throw new Error('404|User not found')

    const allUsers = await this.userODM.getAllUsers()

    const isEmail = Array.isArray(allUsers) && allUsers.some((user: IUser) => user.email === email)

    if (isEmail) throw new Error('409|Email already registered')

    const encryptPassword = encripty(password)

    password = encryptPassword

    const updateUser = await this.userODM.updateUser({ email, password, displayName }, id)

    return updateUser
  }
}

export default UserService
