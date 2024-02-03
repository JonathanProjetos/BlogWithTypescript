import type { Request, Response, NextFunction } from 'express'

const errorLauncher = ( err: Error, _req: Request, res: Response,_next: NextFunction) => {
  const [status, message] = err.message.split('|')
  if (err.message.split('').includes('|')) {
    res.status(Number(status)).json({ error: message })
  } else {
    console.error('Error não Mapeado: ', err)
    console.error('Error não Mapeado: ', err.message)
    res.status(500).json({ error: err.message })
  }
}

export default errorLauncher