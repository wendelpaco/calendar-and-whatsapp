import { Schema, model, Document} from 'mongoose'
import bcryptjs from 'bcryptjs'

export interface IUser extends Document {
  email: string
  password: string
  name: string
  cpf: string
  encrypPassword(candidatePassword: string): Promise<string>
  comparePasswords(candidatePassword: string): Promise<Boolean>
}

const UserSchema: Schema<IUser> = new Schema({
  email: {
    type: String,
    require: true,
    lowercase: true,
  },
  password: {
    type: String,
    require: true,
    min: 6,
    select: false,
  },
  name: {
    type: String,
    require: true,
    min: 4,
    lowercase: true,
  },
  cpf: {
    type: String,
    require: true,
    min: 11,
  },
  image: {
    data: Buffer,
    contentType: String,
  }
}, { timestamps: true })

UserSchema.methods.encrypPassword = async (candidatePassword: string): Promise<string> => {
  const salt = await bcryptjs.genSalt(10)
  return await bcryptjs.hash(candidatePassword, salt)
}

UserSchema.methods.comparePasswords = async function (candidatePassword: string): Promise<boolean> {
  return await bcryptjs.compare(candidatePassword, this.password)
}

export default model<IUser>('user', UserSchema)
