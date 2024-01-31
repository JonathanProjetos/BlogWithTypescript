import type { Request, Response } from 'express'

interface IPostIputWithIdUser {
  title: string
  content: string
  userId: string
}

interface IPostIput {
  title: string
  content: string
}

interface IPostOutput {
  id?: string
  title: string
  content: string
  userId: string
  published: Date
  updatedAt: Date
}

interface IPostController {
  create: (req: Request, res: Response) => void
  getAllPosts: (req: Request, res: Response) => void
  getPostById: (req: Request, res: Response) => void
}

export type {
  IPostIput,
  IPostOutput,
  IPostIputWithIdUser,
  IPostController
}
