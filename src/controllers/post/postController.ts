import type { Request, Response } from 'express'
import type PostService from '../../services/post/postService'
import { type IPostController } from '../../interfaces/IPost'

class PostController implements IPostController {
  constructor (private readonly postService: PostService) {}

  public createPost = async (req: Request, res: Response): Promise<Response> => {
    const { title, content, userEmail } = req.body

    const result = await this.postService.createPost({ title, content }, userEmail as string)

    return res.status(201).json(result)
  }

  public getAllPosts = async (_req: Request, res: Response): Promise<Response> => {
    const result = await this.postService.getAllPosts()

    return res.status(200).json(result)
  }

  public getPostById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params

    const result = await this.postService.getPostById(id)

    return res.status(200).json(result)
  }

  public updatePost = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params
    const { title, content, userEmail } = req.body

    const result = await this.postService.updatePost(id, userEmail as string, { title, content })

    return res.status(200).json(result)
  }

  public deletePost = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params
    const { userEmail } = req.body

    const result = await this.postService.deletePost(id, userEmail as string)

    return res.status(200).json(result)
  }
}

export default PostController
