import request from '../utils/request'
import type { RegisterUser, LoginUser } from '../../types/user'
/**
 *
 * @param data 用户名, 密码
 */
export const toRegister = (data: RegisterUser) => {
  request.post('/user/register', data)
}

/**
 *
 * @param data 用户名, 密码
 */
export const toLogin = (data: LoginUser) => {
  request.post('/user/login', data)
}
