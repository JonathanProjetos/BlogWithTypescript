import type UserODM from '../../models/user/userODM'
import { type IAuthInput } from '../../interfaces/IAuth'
import { validateInputAuth } from '../../middlewares/joiInputDataAuth'
import bcryptJs from 'bcryptjs'
import { generateToken } from '../../middlewares/token'

class AuthService {
  constructor (private readonly userODM: typeof UserODM) {}

  login = async (body: IAuthInput): Promise<string | null> => {
    const { email, password } = validateInputAuth(body)

    const isUser = await this.userODM.getUserByEmail(email)

    if (isUser === null) throw new Error('404|User not found')

    if (!bcryptJs.compareSync(password, isUser.password)) {
      throw new Error('401|Incorrect password')
    }

    const token = generateToken(email)

    return token
  }
}

export default AuthService
