import {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_NOT_EXISTS,
  PASSWORD_IS_INCORRECT,
  UNAUTHORIZETION,
} from '../config/error.js';

import UserService from '../service/user.service.js';

import md5Password from '../utils/md5-pwd.js';

import jwt from 'jsonwebtoken';

import { SECRET_KEY } from '../config/index.js';

const verifyLogin = async (ctx, next) => {
  const { username, password } = ctx.request.body;

  if (!username || !password) {
    return ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRED, ctx);
  }

  const users = await UserService.findUserByName(username);

  if (!users.length) {
    return ctx.app.emit('error', NAME_IS_NOT_EXISTS, ctx);
  }

  if (users[0].password !== md5Password(password)) {
    return ctx.app.emit('error', PASSWORD_IS_INCORRECT, ctx);
  }

  ctx.user = users[0];
  await next();
};

const verifyAuth = async (ctx, next) => {
  try {
    const authorization = ctx.headers.authorization;
    if (!authorization) {
      return ctx.app.emit('error', UNAUTHORIZETION, ctx);
    }
    const token = authorization.replace('Bearer ', '');

    const result = jwt.verify(token, SECRET_KEY);

    ctx.user = result;
    
    ctx.body = 'test data';
    
    await next();
  } catch (err) {
    ctx.app.emit('error', UNAUTHORIZETION, ctx);
    console.log(err);
  }

};

export { verifyLogin, verifyAuth };
