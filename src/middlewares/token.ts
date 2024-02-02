import 'dotenv/config'
import { verify, sign, type JwtPayload } from 'jsonwebtoken'

const secret = process.env.JWT_SECRET

const generateToken = (email: string): string => {
  if (secret === null || secret === undefined) {
    throw new Error('404|JWT_SECRET is not difined')
  }
  const token = sign({ email }, secret, {
    expiresIn: '1d',
    algorithm: 'HS256'
  })
  return token
}

const verifyToken = (token: string | undefined): JwtPayload => {
  if (token === null || secret === undefined) {
    throw new Error('404|payload is not difined')
  }

  if (typeof token === 'undefined') {
    throw new Error('401|Token must be provided')
  }

  try {
    const payload = verify(token, secret) as JwtPayload
    return payload
  } catch (err) {
    throw new Error('401|Token must be a valid token')
  }
}

export {
  generateToken,
  verifyToken
}
