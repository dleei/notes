import { TIME_OUT, BASE_URL } from "../config";
import Request from "../service";

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
    onReqResolve: (config) => {
      return config;
    },
    onReqReject: (error) => {
      return console.error(error);
    },
    onResResolve: (res) => {
      return res.data;
    },
    onResReject: (error) => {
      return console.error(error);
    },
  },
});

export default server;
