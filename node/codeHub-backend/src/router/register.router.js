import koaRouter from '@koa/router';
import verifyReg from '../middleware/register.middleware.js';
import RegisterController from '../controller/register.controller.js'


const registerRouter = new koaRouter({ prefix: '/reg' });

registerRouter.post('/', verifyReg, RegisterController.register);

export default registerRouter;