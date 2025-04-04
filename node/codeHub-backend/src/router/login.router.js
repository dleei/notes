import koaRouter from '@koa/router';
import { verifyLogin } from '../middleware/login.middleware.js';
import LoginController from '../controller/login.controller.js'

const loginRouter = new koaRouter({ prefix: '/login' });

loginRouter.post('/', verifyLogin, LoginController.sign);

export default loginRouter;
