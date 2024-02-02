import { type Model, Schema, model } from 'mongoose'
import type { IPostOutput, IPostIputWithIdUser, IPostIput } from '../../interfaces/IPost'

class PostODM {
  private readonly schema: Schema<IPostIputWithIdUser>
  private readonly model: Model<IPostIputWithIdUser>
  private static instance: PostODM

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

  public static getInstance(): PostODM {
    PostODM.instance = new PostODM()
    return PostODM.instance
  } 

  public async create (post: IPostIputWithIdUser): Promise<IPostOutput> {
    const { content, title, userId } = post
    const createdPost = await this.model.create({
      content,
      title,
      userId
    })

    return createdPost as unknown as IPostOutput
  }

  public async getAllPosts (): Promise<IPostOutput[] | null> {
    return await this.model.find()
  }

  public async getPostById (id: string): Promise<IPostOutput | null> {
    return await this.model.findById({ _id: id })
  }

  public async getPostAndUpdate (id: string, body: IPostIput): Promise<IPostOutput | null> {
    const { content, title } = body
    return await this.model.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          title,
          content
        }
      },
      { new: true }
    )
  }

  public async getPostAndDelete (id: string): Promise<IPostOutput | null> {
    return await this.model.findOneAndDelete({ _id: id })
  }
}

export default PostODM.getInstance()
