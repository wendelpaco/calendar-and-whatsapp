import { Request, Response } from 'express'
import { signinValidation, signupValidation } from '../../../libs/Joi';
import { IUser } from '../../model/User/UserModel';
import jwt from 'jsonwebtoken';
import UserModel from '@App/model/User/UserModel';

export class UserController {

  async CreateUserSignup(req: Request, res: Response): Promise<Response> {
    const { email, password, name, cpf, image } = req.body

    // validate user data
    const { error } = signupValidation(req.body)
    if (error) return res.status(400).json({ statusCode: 400, message: error.details[0].message })
    
    // email already exists
    const userEmail = await UserModel.findOne({ email: req.body.email })
    if (userEmail) return res.status(400).json({ statusCode: 400, message: 'Email already exists' })

    // cpf already exists
    const userCpf = await UserModel.findOne({ cpf: req.body.cpf })
    if (userCpf) return res.status(400).json({ statusCode: 400, message: 'CPF already exists' })

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
      const tokenGenerate: string = jwt.sign({ _id: userSaved._id }, process.env.JWT_SECRET || 'secret', { expiresIn: 60 * 60 * 24 })
      return res.header('authorization', tokenGenerate).status(201).json({ statusCode: 201, essage: 'user created with sucess', tokenGenerate })
    } catch(err){
      return res.status(400).json(err)
    }
  }

  async UserSignin(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body

    const { error } = signinValidation(req.body)
    if (error) return res.status(400).json({ statusCode: 400, message: error.details[0].message })
    
    const user = await UserModel.findOne({ email }).select('+password')
    if (!user) return res.status(400).json({ statusCode: 400, message: 'Email or Password is wrong' })

    const candidatePassword = await user.comparePasswords(password)
    if (!candidatePassword) return res.status(400).json({ statusCode: 400, message: 'Email or Password is wrong' })

    // create a token
    const tokenGenerate: string = jwt.sign({ _id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: 60 * 60 * 24 })
    return res.header('authorization', tokenGenerate).status(200).json({ statusCode: 200, message: 'user signed in with success', token: tokenGenerate })
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