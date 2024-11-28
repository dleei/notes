import request from '../utils/request'
import type { RegisterUser, LoginUser } from '../types/user'
/**
 *
 * @param data 用户名, 密码
 */
export const toRegister = (data: RegisterUser) => {
  return request.post('/user/register', data)
}

/**
 *
 * @param data 用户名, 密码
 */
export const toLogin = (data: LoginUser) => {
 return  request.post('/user/login', data)
}
