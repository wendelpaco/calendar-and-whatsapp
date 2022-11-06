import { Router } from 'express'
import { Middleware } from '@App/middlewares/Authenticate'
import { UserController } from '@App/controller/User/UserController'

const vOneRouter: Router = Router();

const middleware = new Middleware()
const createUserSignup = new UserController()

vOneRouter.get('/users', middleware.authenticate, createUserSignup.getUserAll)
vOneRouter.get('/user/:id', middleware.authenticate, createUserSignup.getUserById)
vOneRouter.post('/signup', createUserSignup.createUserSignup)
vOneRouter.post('/signin', createUserSignup.userSignin)

export { vOneRouter }
