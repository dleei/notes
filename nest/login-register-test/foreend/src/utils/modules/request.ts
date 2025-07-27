import { TIME_OUT, BASE_URL } from "../config";
import Request from "../service";
import type { AxiosError } from "axios";

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
const server = new Request({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  
  interceptors: {
    onReqSuccess: (config) => {
      return config;
    },
    onReqFail: (error: AxiosError) => {
      return console.error({
        path: error.config?.url,
        method: error.config?.method,
        message: error.message,
      });
    },
    onResSuccess: (res) => {
      return res.data;
    },
    onResFail: (error: AxiosError) => {
      return console.error({
        path: error.config?.url,
        method: error.config?.method,
        message: error.message,
      });
    },
  },
});

export default server;
