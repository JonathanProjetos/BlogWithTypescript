import { type Model, model, Schema } from 'mongoose'
import type IUser from '../../interfaces/IUser'

class UserODM {
  private readonly schema: Schema<IUser>
  private readonly model: Model<IUser>

  constructor () {
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

  public async create (user: IUser): Promise<IUser> {
    const { email, password, displayName } = user

    return await this.model.create({
      email,
      password,
      displayName
    })
  }

  public async getUserByEmail (email: string): Promise <IUser | null> {
    return await this.model.findOne({ email })
  }

  public async getUserById (id: string): Promise <IUser | null> {
    return await this.model.findOne({ _id: id })
  }
}

export default UserODM
