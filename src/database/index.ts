import mongoose, { ConnectOptions } from 'mongoose'

export class Database {
  constructor() {
    this.connect()
  }
  private connect(): void {
    mongoose.connect(process.env.MONGODB_URL ?? 'mongodb://localhost/test', {
      autoIndex: true
    } as ConnectOptions)
    .then(db => console.log('⚡️ Database is connected ⚡️'))
    .catch(err => console.log(err))
  }
}
