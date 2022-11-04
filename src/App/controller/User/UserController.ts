import { Request, Response } from 'express'
import { Validation } from '../../../libs/Joi';
import { IUser } from '../../model/User/UserModel';
import jwt from 'jsonwebtoken';
import UserModel from '@App/model/User/UserModel';

export class UserController {

  async CreateUserSignup(req: Request, res: Response): Promise<Response> {
    const { email, password, name, cpf, image } = req.body

    // validate user data
    const { error } = Validation.Signup(req.body)
    if (error) return res.status(400).json({ statusCode: 400, message: error.details[0].message })

    // email already exists
    const userEmail = await UserModel.findOne({ email: req.body.email })
    if (userEmail) return res.status(400).json({ statusCode: 400, message: req.__('email_already') })

    // cpf already exists
    const userCpf = await UserModel.findOne({ cpf: req.body.cpf })
    if (userCpf) return res.status(400).json({ statusCode: 400, message: req.__('cpf_already') })

    try {
      // create user
      const user: IUser = new UserModel({
        email,
        password,
        name,
        cpf,
      })
      user.password = await user.encrypPassword(user.password)
      const userSaved = await user.save()

      // create token
      const tokenGenerate: string = jwt.sign({ _id: userSaved._id }, process.env.JWT_SECRET ?? 'secret', { expiresIn: process.env.JWT_EXPIRESIN ?? '24h' })
      return res.header('authorization', tokenGenerate).status(201).json({ statusCode: 201, message: req.__('user_create'), tokenGenerate })
    } catch(err){
      return res.status(400).json(err)
    }
  }

  async UserSignin(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body

    const { error } = Validation.Signin(req.body)
    if (error) return res.status(400).json({ statusCode: 400, message: error.details[0].message })

    const user = await UserModel.findOne({ email }).select('+password')
    if (!user) return res.status(400).json({ statusCode: 400, message: req.__('email_password_wrong') })

    const candidatePassword = await user.comparePasswords(password)
    if (!candidatePassword) return res.status(400).json({ statusCode: 400, message: req.__('email_password_wrong') })

    // create a token
    const tokenGenerate: string = jwt.sign({ _id: user._id }, process.env.JWT_SECRET ?? 'secret', { expiresIn: process.env.JWT_EXPIRESIN ?? '24h' })
    return res.header('authorization', tokenGenerate).status(200).json({ statusCode: 200, message: req.__('user_signed'), token: tokenGenerate })
  }

  async UpdateUser(req: Request, res: Response): Promise<Response> {
    return res.status(201).json()
  }

  async DeleteUser(req: Request, res: Response): Promise<Response> {
    return res.status(201).json()
  }

  async GetUserAll(req: Request, res: Response): Promise<Response> {
    try {
      const users = await UserModel.find()
      return res.status(200).json({ statusCode: 200, users })
    } catch(err){
      return res.status(400).json()
    }
  }

  async GetUserById(req: Request, res: Response): Promise<Response> {
    try {
      return res.status(200).json()
    } catch(err){
      return res.status(400).json()
    }
  }
}
