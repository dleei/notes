import koaRouter from '@koa/router';
import userController from '../controller/user.controller.js';
import { verifyUser } from '../middleware/user.middleware.js';

const userRouter = new koaRouter({ prefix: '/user' });

userRouter.get('/', verifyUser, userController.create);


export default userRouter;
