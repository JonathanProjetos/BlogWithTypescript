import { Router } from 'express'
import UserODM from '../../models/user/userODM'
import UserService from '../../services/user/userService'
import UserController from '../../controllers/user/userController'
import { validateToken } from '../../middlewares/decodedToken'

const model = UserODM
const service = new UserService(model)
const controller = new UserController(service)

const userRouter = Router()

userRouter.post('/users', controller.createUser)
userRouter.get('/users/:id', controller.getUserById)
userRouter.delete('/users/:id', validateToken, controller.deleteUser)
userRouter.put('/users/:id', validateToken, controller.updateUser)

export default userRouter
