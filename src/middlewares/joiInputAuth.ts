import joi from 'joi'
import { type IAuthInput } from '../interfaces/IAuth'

const validateInputAuth = (payload: IAuthInput): IAuthInput => {
  const authSchema = joi.object({
    email: joi.string().required().email().messages({
      'string.empty': '400|The "email" field cannot be empty.',
      'any.required': '400|The "email" field is mandatory.',
      'string.email': '400|The "email" must be in the format test@test.com.'
    }),
    password: joi.string().min(6).required().messages({
      'string.empty': '400|The "password" field cannot be empty.',
      'any.required': '400|The "password" field is mandatory.',
      'string.min': '400|The "password" field must be at least 6 characters.'
    })
  })

  const { error, value } = authSchema.validate(payload)

  if (error !== undefined) {
    throw new Error(error?.message)
  }

  return value
}

export {
  validateInputAuth
}
