import { type Model, Schema, model } from 'mongoose'
import type { IPostOutput, IPostIputWithIdUser } from '../../interfaces/IPost'

class PostODM {
  private readonly schema: Schema<IPostIputWithIdUser>
  private readonly model: Model<IPostIputWithIdUser>

  constructor () {
    this.schema = new Schema<IPostIputWithIdUser>({
      content: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      userId: {
        type: String,
        required: true
      }
    },
    {
      timestamps: {
        createdAt: 'published',
        updatedAt: 'updatedAt'
      },
      versionKey: false
    })

    this.model = model<IPostIputWithIdUser>('post', this.schema)
  }

  public async create (post: IPostIputWithIdUser): Promise<IPostOutput> {
    const { content, title, userId } = post
    const createdPost = await this.model.create({
      content,
      title,
      userId
    })

    return createdPost.toObject() as IPostOutput
  }

  public async getAllPosts (): Promise<IPostOutput[] | null> {
    return await this.model.find()
  }

  public async getPostById (id: string): Promise<IPostOutput | null> {
    return await this.model.findById({ _id: id })
  }
}

export default PostODM