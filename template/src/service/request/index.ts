import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import type {
  ApiResponse,
  CustomConfigType,
  RequestInterceptor,
  RequestOptions,
  ResponseInterceptor,
} from './types'

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
})

const customConfig: CustomConfigType = {
  showMessage: false,
  responseType: 'json',
}

const requestSuccessInterceptor: RequestInterceptor = (config) => {
  // 可以在这里添加token、请求头处理等逻辑

  return config
}

const requestErrorInterceptor = (error: any) => {
  console.error('请求配置错误:', error)
  return Promise.reject(error)
}

instance.interceptors.request.use(requestSuccessInterceptor, requestErrorInterceptor)

const responseSuccessInterceptor: ResponseInterceptor = (response) => {
  // console.log('Interceptor: 响应数据:', response.data)
  if (customConfig.responseType === 'blob') {
    return response
  }

  return response
}

const responseErrorInterceptor = (error: any) => {
  // 错误处理逻辑
  const message = error.response?.data?.msg || error.message || '网络错误'
  console.error(`请求失败: ${message}`)

  return Promise.reject(error)
}

instance.interceptors.response.use(responseSuccessInterceptor, responseErrorInterceptor)

// 请求函数
const request = <T = any>({
  url,
  params = {},
  showMessage = false,
  showLog = false,
  method = 'POST',
  data = {},
  responseType = 'json',
}: RequestOptions): Promise<ApiResponse<T>> => {
  customConfig.showMessage = showMessage
  customConfig.responseType = responseType
  // showLog = import.meta.env.DEV // 开发环境下打印日志

  const config: AxiosRequestConfig = {
    url,
    method,
    params,
    data,
    responseType,
  }

  // 请求日志
  if (showLog) {
    console.log(`[Request] ${method?.toUpperCase()} ${url}`, { params, data })
  }

  return instance(config)
    .then((res: AxiosResponse<ApiResponse<T>>) => {
      if (showLog) {
        console.log(`[Response] ${url}`, res.data)
      }
      return res.data
    })
    .catch((err) => {
      // console.error(`请求失败: ${url}`, err)
      throw err // 重新抛出错误以保持Promise链的错误处理
    })
}

export default request
