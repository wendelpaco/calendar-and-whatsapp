import Joi from '@hapi/joi'
import { IUser } from '../App/model/User/UserModel';


export class Validation {
  static Signup(data: IUser): Joi.ValidationResult {
    const UserSchema = Joi.object({
      email: Joi.string().min(6).required().email(),
      password: Joi.string().min(6).required(),
      name: Joi.string().min(4).required(),
      cpf: Joi.string().min(11).max(11).required(),
    })
    return UserSchema.validate(data)
  }

  static Signin(data: IUser): Joi.ValidationResult {
    const UserSchema = Joi.object({
      email: Joi.string().required().email(),
      password: Joi.string().min(6).required()
    })
    return UserSchema.validate(data)
  }
}
