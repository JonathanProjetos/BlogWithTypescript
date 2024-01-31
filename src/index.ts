import express from 'express'
import 'dotenv/config'
import 'express-async-errors'
import { Connection } from './config/connection'
import userRouter from './router/user/userRouter'
import authRouter from './router/auth/authRouter'
import postRouter from './router/post/postRouter'
import swagger from 'swagger-ui-express'
import swaggerDocument from './doc/swagger.json'

class App {
  app: express.Express
  readonly PORT: string | undefined = process.env.PORT
  readonly connection: Connection

  constructor () {
    this.app = express()
    this.app.use(express.json())

    this.connection = new Connection()

    this.app.use('/doc', swagger.serve, swagger.setup(swaggerDocument))
    this.app.use('/', userRouter)
    this.app.use('/', authRouter)
    this.app.use('/', postRouter)

    this.handleError()
  }

  private handleError (): void {
    this.app.use((
      err: Error,
      _req: express.Request,
      res: express.Response,
      _next: express.NextFunction
    ) => {
      const [status, message] = err.message.split('|')
      if (err.message.split('').includes('|')) {
        res.status(Number(status)).json({ error: message })
      } else {
        console.error('Error não Mapeado: ', err)
        console.error('Error não Mapeado: ', err.message)
        res.status(500).json({ error: err.message })
      }
    })
  }

  public start (): void {
    try {
      this.app.listen(this.PORT, () => {
        console.log(`Servidor rodando na porta ${this.PORT}`)
      })
    } catch (err) {
      console.error(err)
    }
  }
}

const server = new App()
server.start()
