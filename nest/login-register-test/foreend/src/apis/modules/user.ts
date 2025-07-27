import { request } from "@/utils";
import { LoginVO, RegisterVO } from "@/types/login";

/**
 * login
 */

export const login = (params: LoginVO) => {
  return request.post("/api/user/login",params, {
    options: {
      isAuth: true,
    },
  });
};

/**
 * register
 */

export const register = (params: RegisterVO) => {
  return request.post("/api/user/register", params);
};
