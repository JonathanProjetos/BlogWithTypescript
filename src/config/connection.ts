import 'dotenv/config'
import mongoose from 'mongoose'

export class Connection {
  readonly USERNAME = process.env.MONGO_USERNAME
  readonly PASSWORD = process.env.MONGO_PASSWORD
  readonly HOSTNAME = process.env.MONGO_HOSTNAME
  readonly DB_PORT = process.env.MONGO_PORT
  readonly DB_NAME = process.env.MONGO_DB
  readonly DB_DATABASE = process.env.MONGO_DB

  constructor () {
    this.connect()
  }

  public connect (): void {
    const DB_CONNECT = `mongodb://${this.USERNAME}:${this.PASSWORD}@${this.HOSTNAME}:${this.DB_PORT}`
    try {
      void mongoose.connect(DB_CONNECT, {
        dbName: this.DB_DATABASE
      })
      console.log(`Conectado ao banco de dados: ${this.DB_DATABASE}`)
    } catch (err) {
      console.error('Erro ao conectar ao banco de dados:', err)
    }
  }
}
