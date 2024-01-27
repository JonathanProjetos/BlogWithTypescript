import bcryptJs from 'bcryptjs'

const encripty = (password: string): string => {
  const salt = bcryptJs.genSaltSync(10)
  return bcryptJs.hashSync(password, salt)
}

export default encripty
