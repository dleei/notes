import app from '../app/index.js';
import {
  NAME_OR_PASSWORD_IS_REQUIRED,
  USER_ALREADY_EXISTS,
  NAME_IS_NOT_EXISTS,
  PASSWORD_IS_INCORRECT,
} from '../config/error.js';

app.on('error', (err, ctx) => {
  let code = 20000;
  let message = '';

  switch (err) {
    case NAME_OR_PASSWORD_IS_REQUIRED:
      code = 20001;
      message = '用户名或密码不能为空';
      break;
    case USER_ALREADY_EXISTS:
      code = 20002;
      message = '用户名已存在';
      break;
    case NAME_IS_NOT_EXISTS:
      code = 20003;
      message = '用户名不存在';
      break;
    case PASSWORD_IS_INCORRECT:
      code = 20004;
      message = '密码错误,请检查密码是否正确';
      break;
  }

  ctx.body = {
    code,
    message,
  };
});
