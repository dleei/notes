import type { Login } from "@/types/user";
import request from "@/utils/modules/request";
import { dlRequest } from "@/utils/modules/request";
/**
 *
 * 获取登录二维码
 */
export const getCodeImg = () => request.get("/api/code/generate");
/**
 * 获取二维码当前状态
 * @param id 二维码id
 * @returns
 */
export const codeCheck = (id: string | number) =>
  request.get(`/api/code/check?uid=${id}`);
/**
 * 修改二维码状态
 */
export const codeUpdate = (id: string) => dlRequest.get(`/code/scan?uid=${id}`);

/**
 * 取消登录
 *
 */
export const cancelLogin = (id: string) => dlRequest.get(`/code/cancel?uid=${id}`);

/**
 * 确认登录
 *
 */

export const confirmLogin = (id: string) => dlRequest.get(`/code/confirm?uid=${id}`);

/**
 * 登录
 */
export const login = async (params: Login) => dlRequest.post("/code/login", params);

/**
 * 获取用户信息
 *
 */

export const getUserInfo = () =>
  dlRequest.get("/code/profile", {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user-token"),
    },
  });
