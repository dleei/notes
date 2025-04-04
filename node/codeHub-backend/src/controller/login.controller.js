import jwt from 'jsonwebtoken';

import { SECRET_KEY } from '../config/index.js';

class LoginController {
  async sign(ctx, next) {
    const { username } = ctx.user;

    const token = jwt.sign({ username }, SECRET_KEY, {
      expiresIn: '1d'
    });

    ctx.body = {
      code: 20000,  
      message: '登录成功',
      data: { 
        username, 
        token 
      }
    };
    await next();
  }
}

export default new LoginController();
