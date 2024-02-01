import type { Request, Response } from 'express'
import type PostService from '../../services/post/postService'
import { type IPostController } from '../../interfaces/IPost'

class PostController implements IPostController {
  constructor (private readonly postservice: PostService) {}

  public async createPost (req: Request, res: Response): Promise<Response> {
    const { title, content, userEmail } = req.body

    const result = await this.postservice.create({ title, content }, userEmail as string)

    return res.status(201).json(result)
  }

  public async getAllPosts (_req: Request, res: Response): Promise<Response> {
    const result = await this.postservice.getAllPosts()

    return res.status(200).json(result)
  }

  public async getPostById (req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    const result = await this.postservice.getPostById(id)

    return res.status(200).json(result)
  }

  public async updatePost (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const { title, content, userEmail } = req.body

    const result = await this.postservice.updatePost(id, userEmail as string, { title, content })

    return res.status(200).json(result)
  }

  public async deletePost (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const { userEmail } = req.body

    const result = await this.postservice.deletePost(id, userEmail as string)

    return res.status(200).json(result)
  }
}

export default PostController
