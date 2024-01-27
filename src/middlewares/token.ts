import 'dotenv/config'
import jwt from 'jsonwebtoken'

const secret = process.env.JWT_SECRET

const generateToken = (payload: string): string => {
  if (secret === null || secret === undefined) {
    throw new Error('404|payload is not difined')
  }
  const token = jwt.sign({ payload }, secret, {
    expiresIn: '1d',
    algorithm: 'HS256'
  })
  return token
}

const verifyToken = (token: string): jwt.JwtPayload => {
  if (token === null || secret === undefined) {
    throw new Error('404|payload is not difined')
  }

  try {
    const payload = jwt.verify(token, secret) as jwt.JwtPayload
    return payload
  } catch (err) {
    throw new Error('401|Token must be a valid token')
  }
}

export {
  generateToken,
  verifyToken
}
