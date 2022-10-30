import { Router } from 'express'
import { Middleware } from '@App/middlewares/VerifyToken'
import { UserController } from '@App/controller/User/UserController'

export const router = Router()
const middleware = new Middleware()
const createUserSignup = new UserController()

router.get('/users', middleware.verifyToken, createUserSignup.GetUserAll)
router.post('/signup', createUserSignup.CreateUserSignup)
router.post('/signin', createUserSignup.UserSignin)
