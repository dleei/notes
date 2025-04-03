import koaRouter from '@koa/router'
import userController from '../controller/user.controller'

const userRouter = new koaRouter({ prefix: '/user' })

userRouter.get('/',userController.create)