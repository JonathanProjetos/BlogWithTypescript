import { type Request, type Response, type NextFunction } from 'express'
import { verifyToken } from '../middlewares/token'

const validateToken = (req: Request, _res: Response, next: NextFunction): void => {
  try {
    const { authorization } = req.headers
    const filterBearerSwagger = authorization?.split(' ').pop()
    const data = verifyToken(filterBearerSwagger)

    // Crio uma chave "user" dentro do objeto body do request para armazenar o email vindo do token.
    req.body.userEmail = data.email
    next()
  } catch (err) {
    console.error(err)
    throw new Error('404|Token not found')
  }
}

export {
  validateToken
}
