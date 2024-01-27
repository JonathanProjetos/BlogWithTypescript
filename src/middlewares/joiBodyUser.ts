import joi from 'joi'
import type IUser from '../interfaces/IUser'

const validateBodyUser = (body: IUser): IUser => {
  const userSchema = joi.object({
    displayName: joi.string().required().messages({
      'string.empty': '400|The "displayName" field cannot be empty.',
      'any.required': '400|The "displayName" field is mandatory.'
    }),
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

  const { error, value } = userSchema.validate(body)

  if (error !== undefined) {
    const err = new Error(error?.message)
    throw err
  } else {
    return value
  }
}

export { validateBodyUser }
