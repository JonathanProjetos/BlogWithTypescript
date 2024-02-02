import type UserODM from '../../models/user/userODM'
import type PostODM from '../../models/post/PostODM'
import { validateBodyPost } from '../../middlewares/joiBodyPost'
import { type IPostIput, type IPostOutput } from '../../interfaces/IPost'

class PostService {
  constructor (
    private readonly postODM: typeof PostODM,
    private readonly userODM: typeof UserODM
  ) {}

  public createPost = async (body: IPostIput, userEmail: string): Promise<IPostOutput> => {
    const { title, content } = validateBodyPost(body)

    if (userEmail === undefined || userEmail.length === 0) throw new Error('401|Unauthorized')

    const isUser = await this.userODM.getUserByEmail(userEmail)

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

  public getAllPosts = async (): Promise<IPostOutput[]> => {
    const posts = await this.postODM.getAllPosts()

    if (posts === null) throw new Error('404|Posts not found')

    return posts
  }

  public getPostById = async (id: string): Promise<IPostOutput> => {
    if (id === undefined || id.length === 0) throw new Error('404|Unable to locate user id')

    const post = await this.postODM.getPostById(id)

    if (post === null) throw new Error('404|Posts not found')

    return post
  }

  public updatePost = async (id: string, userEmail: string, body: IPostIput): Promise<IPostOutput | null> => {
    const { content, title } = validateBodyPost(body)

    if (id === undefined || id.length === 0 ) throw new Error('404|Unable to locate user ID')

    if (userEmail === undefined || userEmail.length === 0) throw new Error('401|Unauthorized')

    const getUserForEmail = await this.userODM.getUserByEmail(userEmail)

    if (getUserForEmail === null) throw new Error('404|User is not registered')

    const getPostById = await this.postODM.getPostById(id)

    if (getPostById?.userId !== getUserForEmail.id) throw new Error('401|Unauthorized')

    const updatePost = await this.postODM.getPostAndUpdate(id, { title, content })

    return updatePost
  }

  public deletePost = async (id: string, email: string): Promise<IPostOutput | null> => {
    
    if(id === undefined || id.length === 0)throw new Error('404|Unable to locate user ID')

    if (email === undefined || email.length === 0) throw new Error('401|Unauthorized')

    const getUserForEmail = await this.userODM.getUserByEmail(email)

    if (getUserForEmail === null) throw new Error('404|User not found')

    const getPostById = await this.postODM.getPostById(id)

    if (getPostById?.userId !== getUserForEmail.id) throw new Error('401|Unauthorized')

    const deletePost = await this.postODM.getPostAndDelete(id)

    return deletePost
  }
}

export default PostService
