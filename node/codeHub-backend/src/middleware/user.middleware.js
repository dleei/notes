import userService from '../service/user.service.js';
import {
  NAME_OR_PASSWORD_IS_REQUIRED,
  USER_ALREADY_EXISTS,
} from '../config/error.js';

import { SECRET_KEY } from '../config/index.js';

import jwt from 'jsonwebtoken';

import md5Password from '../utils/md5-pwd.js';

const verifyUser = async (ctx, next) => {
  const { username, password } = ctx.request.body;

  if (!username || !password) {
    return ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRED, ctx);
  }

  const users = await userService.findUserByName(username);

  if (users.length) {
    return ctx.app.emit('error', USER_ALREADY_EXISTS, ctx);
  }

  await next();
};

const cryptoPwd = async (ctx, next) => {
  const { password } = ctx.request.body;

  if (!password) {
    return ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRED, ctx);
  }

  ctx.request.body.password = md5Password(password);
  await next();
};

const signToken = async (ctx, next) => {
  const payload = {
    id: 125,
    name: 'zhangsan',
  };

  // 生成token
  // 第一个参数是payload
  // 第二个参数是密钥
  // 第三个参数是配置项，比如过期时间
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

  ctx.response.body.token = token;

  await next();
};

export { verifyUser, cryptoPwd, signToken };
