import { TIME_OUT, BASE_URL } from "../config";
import Request from "../service";

import { message } from "antd";
import { ResponseStatus } from "@/enum";
/**
 * axios 请求封装
 * @author dleei
 * @param {Object} config 请求配置
 * @returns {Promise}
 * @example
 * ```
 * import server from '@/utils/request';
 * const res = await server.get('/api/login')
 * ```
 */

const { ALREADY_EXISTS, NOT_FOUND, PASSWORD_ERROR } = ResponseStatus;

const server = new Request({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    onReqResolve: (config) => {
      return config;
    },
    onReqReject: (error) => {
      return console.error(error);
    },
    onResResolve: (res) => {
      if (res.data.code === ALREADY_EXISTS) {
        message.error("用户已存在");
      } else if (res.data.code === NOT_FOUND) {
        message.error("用户不存在");
      } else if (res.data.code === PASSWORD_ERROR) {
        message.error("密码错误");
      }

      // 处理响应数据
      return res.data;
    },
    onResReject: (error) => {
      return console.error(error);
    },
  },
});

export default server;
