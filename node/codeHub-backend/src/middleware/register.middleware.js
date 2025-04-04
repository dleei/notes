import { 
  NAME_OR_PASSWORD_IS_REQUIRED,
  USER_ALREADY_EXISTS 
} from '../config/error.js';
import UserService from '../service/user.service.js';
import md5Password from '../utils/md5-pwd.js';

const verifyReg = async (ctx, next) => {
  const { username, password } = ctx.request.body;
  /**
   * 用户名或密码是否为空
   */
  if (!username || !password) {
    return ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRED, ctx);
  }

  /**
   * 用户名是否存在
   */
  const users = await UserService.findUserByName(username);
  if (users.length) {
    return ctx.app.emit('error', USER_ALREADY_EXISTS, ctx);
  }
  
/**
 * 密码加密
 */
  ctx.request.body.password = md5Password(password);
  await next();
};

export default verifyReg;
