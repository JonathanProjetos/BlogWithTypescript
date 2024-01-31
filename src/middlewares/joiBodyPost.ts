import joi from 'joi'
import { type IPostIput } from '../interfaces/IPost'

const validateBodyPost = (body: IPostIput): IPostIput => {
  const postSchema = joi.object({
    title: joi.string().required().messages({
      'any.required': '404|The "title" field is mandatory',
      'string.empty': '404|The "title" field is not allowed to be empty',
      'string.base': '404| The "title" field cannot be of type number'
    }),
    content: joi.string().required().messages({
      'any.required': '404|The "content" field is mandatory',
      'string.empty': '404|The "content" field is not allowed to be empty',
      'string.base': '404|The "content" field cannot be of type number'
    })
  })

  const { error, value } = postSchema.validate(body)

  if (error !== undefined) {
    throw new Error(error?.message)
  }

  return value
}

export {
  validateBodyPost
}
