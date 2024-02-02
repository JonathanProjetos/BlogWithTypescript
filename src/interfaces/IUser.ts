import type { Request, Response } from 'express'

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

interface IUserController {
  createUser: (req: Request, res: Response) => void
  getUserById: (req: Request, res: Response) => void
  deleteUser: (req: Request, res: Response) => void
  updateUser: (req: Request, res: Response) => void
}

export type {
  IUser,
  IUserResponseDelete,
  IUserController
}
