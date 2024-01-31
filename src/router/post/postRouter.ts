import { Router } from 'express'
import UserODM from '../../models/user/userODM'
import PostODM from '../../models/post/PostODM'
import PostService from '../../services/post/postService'
import PostController from '../../controllers/post/postController'
import { validateToken } from '../../middlewares/decodedToken'

const postRouter = Router()
const modelUser = UserODM
const modelPost = new PostODM()
const service = new PostService(modelPost, modelUser)
const controller = new PostController(service)

postRouter.post('/posts', validateToken, controller.create)
postRouter.get('/posts', controller.getAllPosts)
postRouter.get('/posts/:id', controller.getPostById)

export default postRouter
