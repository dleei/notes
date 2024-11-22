import axios from 'axios'
import type { InternalAxiosRequestConfig, AxiosResponse } from 'axios'

const server = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 5000,
})

// 给自定义的 `server` 实例添加请求拦截器
server.interceptors.request.use(
  function (config: InternalAxiosRequestConfig) {
    // 请求发送前的处理
    return config
  },
  function (error) {
    // 请求错误处理
    return Promise.reject(error)
  }
)

// 给自定义的 `server` 实例添加响应拦截器
server.interceptors.response.use(
  function (response: AxiosResponse) {
    // 处理成功的响应
    return response.data
  },
  function (error) {
    // 处理响应错误
    return Promise.reject(error)
  }
)

export default server
