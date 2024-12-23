import axios from 'axios'

const server  = axios.create({
  baseURL: import.meta.env.MODE === 'development' ? '/' : import.meta.env.VITE_BASE_URL_PROD, // 请求基地址
  timeout: 1000
})

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response.data;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

export default server;
