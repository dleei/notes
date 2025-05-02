import type {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

export interface Interceptor<T> {
  onReqResolve?: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;
  onReqReject?: (error: any) => any;
  onResResolve?: (config: T) => T | ResponseData;
  onResReject?: (error: any) => any;
}

export interface ResponseData {
  code: number;
  message: string;
  data: any;
}

export interface RequestConfig<T = AxiosResponse>
  extends AxiosRequestConfig {
  interceptors?: Interceptor<T>;
}
