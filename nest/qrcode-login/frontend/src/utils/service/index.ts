import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { RequestConfig } from '../types/request';

class Request {
  private instance: AxiosInstance;

  constructor(config: RequestConfig) {
    this.instance = axios.create(config);
    // 请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        return config;
      },
      (err) => {
        return err;
      }
    );

    // 对特定请求实例添加拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.onReqResolve,
      config.interceptors?.onReqReject
    );
    this.instance.interceptors.response.use(
      config.interceptors?.onResResolve,
      config.interceptors?.onResReject
    );

    // 全局响应拦截器，保证最后执行
    this.instance.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        return err;
      }
    );
  }

  request<T>(config: RequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 如果我们为单个请求设置拦截器，这里使用单个请求的拦截器
      if (config.interceptors?.onReqReject) {
        config = config.interceptors.onReqReject(config as any);
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 如果我们为单个响应设置拦截器，这里使用单个响应的拦截器
          if (config.interceptors?.onResResolve) {
            res = config.interceptors.onResResolve(res);
          }

          resolve(res);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }

  // 其他请求方法
  // get
  public get<T = any>(url: string, config?: RequestConfig): Promise<T>;
  public get<T = any>(config: RequestConfig): Promise<T>;
  public get<T = any>(urlOrConfig: string | RequestConfig, config?: RequestConfig): Promise<T> {
    if (typeof urlOrConfig === 'string') {
      // 简写形式：直接传入 URL
      return this.instance({ ...config, url: urlOrConfig, method: 'GET' });
    } else {
      // 完整形式：传入 RequestConfig 对象
      return this.instance({ ...urlOrConfig, method: 'GET' });
    }
  }

  // post
  public post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T>;
  public post<T = any>(config: RequestConfig): Promise<T>;
  public post<T = any>(urlOrConfig: string | RequestConfig, data?: any, config?: RequestConfig): Promise<T> {
    if (typeof urlOrConfig === 'string') {
      // 简写形式：直接传入 URL 和 data
      return this.instance({ ...config, url: urlOrConfig, data, method: 'POST' });
    } else {
      // 完整形式：传入 RequestConfig 对象
      return this.instance({ ...urlOrConfig, method: 'POST' });
    }
  }

  // put
  public put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T>;
  public put<T = any>(config: RequestConfig): Promise<T>;
  public put<T = any>(urlOrConfig: string | RequestConfig, data?: any, config?: RequestConfig): Promise<T> {
    if (typeof urlOrConfig === 'string') {
      // 简写形式：直接传入 URL 和 data
      return this.instance({ ...config, url: urlOrConfig, data, method: 'PUT' });
    } else {
      // 完整形式：传入 RequestConfig 对象
      return this.instance({ ...urlOrConfig, method: 'PUT' });
    }
  }

  // delete
  public delete<T = any>(url: string, config?: RequestConfig): Promise<T>;
  public delete<T = any>(config: RequestConfig): Promise<T>;
  public delete<T = any>(urlOrConfig: string | RequestConfig, config?: RequestConfig): Promise<T> {
    if (typeof urlOrConfig === 'string') {
      // 简写形式：直接传入 URL
      return this.instance({ ...config, url: urlOrConfig, method: 'DELETE' });
    } else {
      // 完整形式：传入 RequestConfig 对象
      return this.instance({ ...urlOrConfig, method: 'DELETE' });
    }
  }

  // patch
  public patch<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T>;
  public patch<T = any>(config: RequestConfig): Promise<T>;
  public patch<T = any>(urlOrConfig: string | RequestConfig, data?: any, config?: RequestConfig): Promise<T> {
    if (typeof urlOrConfig === 'string') {
      // 简写形式：直接传入 URL 和 data
      return this.instance({ ...config, url: urlOrConfig, data, method: 'PATCH' });
    } else {
      // 完整形式：传入 RequestConfig 对象
      return this.instance({ ...urlOrConfig, method: 'PATCH' });
    }
  }
}

export default Request;
