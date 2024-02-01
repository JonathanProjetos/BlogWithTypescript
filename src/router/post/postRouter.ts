import { Router } from 'express'
import UserODM from '../../models/user/userODM'
import PostODM from '../../models/post/PostODM'
import PostService from '../../services/post/postService'
import PostController from '../../controllers/post/postController'
import { validateToken } from '../../middlewares/decodedToken'

const postRouter = Router()

const instanceUserModel = UserODM
const modelPost = new PostODM()
const service = new PostService(modelPost, instanceUserModel)
const controller = new PostController(service)

postRouter.post('/posts', validateToken, controller.createPost)
postRouter.get('/posts', controller.getAllPosts)
postRouter.get('/posts/:id', controller.getPostById)
postRouter.put('/posts/:id', validateToken, controller.updatePost)
postRouter.delete('/posts/:id', validateToken, controller.deletePost)

export default postRouter
