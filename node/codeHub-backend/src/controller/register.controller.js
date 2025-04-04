import registerService from '../service/register.service.js';

class RegisterController {
  async register(ctx, next) {
    const { username, password } = ctx.request.body;
    const result = await registerService.create({ username, password });
    
    ctx.body = {
      code: 20000,
      message: '注册成功',
      data: {
        id: result.insertId,
        username
      }
    };
    
     await next();
  }
}

export default new RegisterController();