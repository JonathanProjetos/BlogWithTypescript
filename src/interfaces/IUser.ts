interface IUser {
  id?: string
  email: string
  password: string
  displayName: string
}

interface IUserResponseDelete {
  acknowledged: boolean
  deletedCount: number
}

export type {
  IUser,
  IUserResponseDelete
}
