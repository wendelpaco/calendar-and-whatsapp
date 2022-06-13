import mongoose from 'mongoose'

export class Database {
  constructor() {
    this.connect()
  }
  private connect(): void {
    mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }).then(db => console.log('⚡️ Database is connected ⚡️')).catch(err => console.log(err))
  }
}