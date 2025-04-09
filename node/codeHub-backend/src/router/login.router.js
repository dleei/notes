import koaRouter from '@koa/router';
import { verifyLogin, verifyAuth } from '../middleware/login.middleware.js';
import LoginController from '../controller/login.controller.js';

const loginRouter = new koaRouter({ prefix: '/login' });

/**
 * @swagger
 * tags:
 *   name: 用户认证
 *   description: 用户登录鉴权相关接口
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: 用户登录
 *     description: 使用账号密码进行系统登录
 *     tags: [用户认证]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: admin
 *                 description: 登录账号
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "123456"
 *                 description: 登录密码
 *     responses:
 *       200:
 *         description: 登录成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 0
 *                 message:
 *                   type: string
 *                   example: "登录成功"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxx"
 *       401:
 *         description: 认证失败
 *         content:
 *           application/json:
 *             example:
 *               code: 401
 *               message: 用户名或密码错误
 */
loginRouter.post('/', verifyLogin, verifyAuth, LoginController.sign);

export default loginRouter;
