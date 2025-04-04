
import {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_NOT_EXISTS,
  PASSWORD_IS_INCORRECT,
} from '../config/error.js';

import UserService from '../service/user.service.js';

import md5Password from '../utils/md5-pwd.js';

const verifyLogin = async (ctx, next) => {
  const { username, password } = ctx.request.body;
  
  // 添加错误捕获
  try {
    if (!username || !password) {
      return ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRED, ctx);
    }

    // 修正方法名为 findUserByName
    const users = await UserService.findUserByName(username);
    
    if (!users.length) {
      return ctx.app.emit('error', NAME_IS_NOT_EXISTS, ctx);
    }

    if (users[0].password !== md5Password(password)) {
      return ctx.app.emit('error', PASSWORD_IS_INCORRECT, ctx);
    }

    ctx.user = users[0];
    await next();
  } catch (err) {
    console.error('登录验证出错:', err); // 添加错误日志
    ctx.status = 500;
    ctx.body = { code: 50000, message: '服务端错误' };
  }
};

export { verifyLogin };
