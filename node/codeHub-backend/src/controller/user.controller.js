import userService from '../service/user.service.js';

class UserController {
  async create(ctx, next) {
    const user = ctx.request.body;

    const result = await userService.create(user);

    ctx.body = {
      code: 20000,
      message: '创建用户成功',
      data: result,
    };
    await next();
  }
}

export default new UserController();
