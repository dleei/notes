import userService from '../service/user.service';

class UserController {
  async create(ctx, next) {
    const user = ctx.request.body;

    userService.create(user);

    ctx.body = '创建用户成功';
    await next();
  }
}

export default new UserController();
