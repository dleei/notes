import koaRouter from '@koa/router';
import { verifyLogin, verifyAuth } from '../middleware/login.middleware.js';
import LoginController from '../controller/login.controller.js';

const loginRouter = new koaRouter({ prefix: '/login' });

loginRouter.post('/', verifyLogin, verifyAuth, LoginController.sign);

export default loginRouter;
