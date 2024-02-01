import { Router } from 'express'
import AuthService from '../../services/auth/authService'
import AuthController from '../../controllers/auth/authController'
import UserODM from '../../models/user/userODM'

const instanceUserModel = UserODM
const service = new AuthService(instanceUserModel)
const controller = new AuthController(service)

const authRouter = Router()

authRouter.post('/login', controller.login)

export default authRouter
