import { type Model, model, Schema } from 'mongoose'
import { type IUser } from '../../interfaces/IUser'

class UserODM {
  private static instance: UserODM
  private readonly schema: Schema<IUser>
  private readonly model: Model<IUser>

  private constructor () {
    this.schema = new Schema<IUser>({
      email: {
        type: String,
        required: true
      },

      password: {
        type: String,
        required: true
      },

      displayName: {
        type: String,
        required: true
      }
    }, {
      versionKey: false
    })

    this.model = model<IUser>('user', this.schema)
  }

  public static getInstance (): UserODM {
    UserODM.instance = new UserODM()
    return UserODM.instance
  }

  public async create (user: IUser): Promise<IUser> {
    const { email, password, displayName } = user

    return await this.model.create({
      email,
      password,
      displayName
    })
  }

  public async getUserByEmail (email: string): Promise<IUser | null> {
    return await this.model.findOne({ email })
  }

  public async getUserById (id: string): Promise<IUser | null> {
    return await this.model.findOne({ _id: id })
  }

  public async getAllUsers (): Promise<IUser[] | null> {
    return await this.model.find()
  }

  public async deleteUser (id: string): Promise<IUser | null> {
    return await this.model.findByIdAndDelete({ _id: id }, { new: true })
  }

  public async updateUser (body: IUser, id: string): Promise<IUser | null> {
    const {
      email,
      password,
      displayName
    } = body

    return await this.model.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          email,
          password,
          displayName
        }
      })
  }
}

export default UserODM.getInstance()
