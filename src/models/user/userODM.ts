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
    })

    this.model = model<IUser>('user', this.schema)
  }

  public async create (user: IUser): Promise<IUser> {
    return await this.model.create({ ...user })
  }
}

export default UserODM
