import type UserODM from '../../models/user/userODM'
import type PostODM from '../../models/post/PostODM'
import { validateBodyPost } from '../../middlewares/joiBodyPost'
import { type IPostIput, type IPostOutput } from '../../interfaces/IPost'

class PostService {
  constructor (
    private readonly postODM: PostODM,
    private readonly userODM: typeof UserODM
  ) {}

  create = async (body: IPostIput, email: string): Promise<IPostOutput> => {
    const { title, content } = validateBodyPost(body)

    if (email === undefined) throw new Error('401|Unauthorized')

    const isUser = await this.userODM.getUserByEmail(email)

    if (isUser === null) throw new Error('404|User is not registered')

    const userId = isUser.id

    if (userId === undefined) throw new Error('404|Unable to locate user ID')

    const newPost = await this.postODM.create({
      title,
      content,
      userId
    })

    return newPost
  }

  getAllPosts = async (): Promise<IPostOutput[]> => {
    const posts = await this.postODM.getAllPosts()  

    if (posts === null) throw new Error('404|Posts not found')

    return posts
  }

  getPostById = async (id: string): Promise<IPostOutput> => {
    const post = await this.postODM.getPostById(id)

    if (post === null) throw new Error('404|Posts not found')

    return post
  }
}

export default PostService
