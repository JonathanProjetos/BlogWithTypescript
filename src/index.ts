import express from 'express'
import 'dotenv/config'
import 'express-async-errors'
import connectDb from './config/connection'
import userRouter from './router/user/userRouter'
import authRouter from './router/auth/authRouter'
import postRouter from './router/post/postRouter'
import swagger from 'swagger-ui-express'
import swaggerDocument from './doc/swagger.json'

const app: express.Express = express()

const PORT: string | undefined = process.env.PORT

app.use(express.json())

app.use('/doc', swagger.serve, swagger.setup(swaggerDocument))

app.use('/', userRouter)
app.use('/', authRouter)
app.use('/', postRouter)

app.use((
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

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
  })
}).catch((err: any) => {
  console.log('Erro ao conectar ao banco de dados err:\r\n')
  console.error(err)
  console.log('\r\nInicialização do servidor foi cancelada')
  process.exit(0)
})
