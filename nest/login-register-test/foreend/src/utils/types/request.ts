import type {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";


export interface Interceptor<T> {
  onReqSuccess?: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;
  onReqFail?: (error: any) => any;
  onResSuccess?: (config: T) => T;
  onResFail?: (error: any) => any;
}

export interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: Interceptor<T>;
  options?: {
    isAuth?: boolean; // 是否需要身份验证
    isPrivate?: boolean; // 是否为私有请求
  }
}
