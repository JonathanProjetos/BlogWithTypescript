import 'dotenv/config'
import mongoose, { type ConnectOptions } from 'mongoose'

// const USERNAME = process.env.MONGO_USERNAME
// const PASSWORD = process.env.MONGO_PASSWORD
// const HOSTNAME = process.env.MONGO_HOSTNAME
// const DB_PORT = process.env.MONGO_PORT
const DB_NAME = process.env.MONGO_DB
const DB_DATABASE = process.env.MONGO_DB

const connectDb = async (): Promise<void> => {
  // const DB_CONNECT = `mongodb://${this.USERNAME}:${this.PASSWORD}@${this.HOSTNAME}:${this.DB_PORT}`
  const DB_CONNECT = 'mongodb://localhost:27017'

  const options: ConnectOptions = {
    dbName: DB_NAME
  }

  try {
    await mongoose.connect(DB_CONNECT, options)
    console.log(`Conectado ao banco de dados: ${DB_DATABASE}`)
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:\n', error)
    console.log('Inicialização do servidor foi cancelada')
    process.exit(1) // Saída com código de erro
  }
}

export default connectDb
