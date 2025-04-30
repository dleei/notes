import request from "@/utils/modules/request";
import type { Register, Login } from "@/types";

/**
 * 登录
 * @param {string} username - 用户名
 * @param {string | number} password - 密码
 */

export const login = (data: Login) => {
  return request.post("/api/user/login", data);
};

/**
 * 注册
 * @param {string} username - 用户名
 * @param {string} password - 密码
 */

export const register = (data: Register) => {
  return request.post("/api/user/register", data);
};
