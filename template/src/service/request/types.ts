 import type {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'

export interface RequestOptions {
  // 请求的接口地址
  url: string
  // 请求的参数
  params?: Record<string, any>
  // 请求的方法
  method?: AxiosRequestConfig['method']
  // 请求的数据
  data?: any
  // 响应的数据类型
  responseType?: AxiosRequestConfig['responseType']
  // 是否显示提示信息
  showMessage?: boolean
  // 是否在控制台打印日志
  showLog?: boolean
}

export interface CustomConfigType {
  // 是否显示提示信息
  showMessage?: boolean
  responseType?: AxiosRequestConfig['responseType']
}

export interface ApiResponse<T = any> {
  code: number
  msg: string | null
  data: T
}

// 拦截器类型定义
export type RequestInterceptor = (
  config: InternalAxiosRequestConfig
) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>

export type RequestErrorInterceptor = (error: AxiosError) => Promise<never>

export type ResponseInterceptor<T = any> = (
  response: AxiosResponse<ApiResponse<T>>
) => AxiosResponse<ApiResponse<T>> | Promise<AxiosResponse<ApiResponse<T>>>

export type ResponseErrorInterceptor = (error: AxiosError<ApiResponse>) => Promise<never>
