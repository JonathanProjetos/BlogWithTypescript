import { Router } from 'express'
import UserODM from '../../models/user/userODM'
import UserService from '../../services/user/userService'
import UserController from '../../controllers/userController'

const model = new UserODM()
const service = new UserService(model)
const controller = new UserController(service)

const userRouter = Router()

userRouter.post('/users', controller.create)
userRouter.get('/users/:id', controller.getUserById)

export default userRouter
