import axios, { type AxiosError, type AxiosInstance, type AxiosRequestConfig, type CreateAxiosDefaults } from 'axios'

type GetConfig = Omit<AxiosRequestConfig, 'url' | 'params' | 'method'>
type PostConfig = Omit<AxiosRequestConfig, 'url' | 'params' | 'data' | 'method'>
type PatchConfig = Omit<AxiosRequestConfig, 'url' | 'params' | 'data' | 'method'>
type DeleteConfig = Omit<AxiosRequestConfig, 'url' | 'params' | 'method'>

class Ajax {
  instance: AxiosInstance
  constructor(config?: CreateAxiosDefaults<any> | undefined) {
    this.instance = axios.create(config)
  }

  get<R = unknown>(url: string, query?: Record<string, JSONValue>, config?: GetConfig) {
    return this.instance.request<R>({ ...config, url, params: query, method: 'get' })
  }

  post<R = unknown>(url: string, query?: Record<string, JSONValue>, data?: Record<string, JSONValue>, config?: PostConfig) {
    return this.instance.request<R>({ ...config, url, params: query, data, method: 'post' })
  }

  patch<R = unknown>(url: string, query?: Record<string, JSONValue>, data?: Record<string, JSONValue>, config?: PatchConfig) {
    return this.instance.request<R>({ ...config, url, params: query, data, method: 'patch' })
  }

  delete<R = unknown>(url: string, query?: Record<string, string>, config?: DeleteConfig) {
    return this.instance.request<R>({ ...config, url, params: query, method: 'delete' })
  }
}

export const ajax = new Ajax({
  baseURL: isDev ? '/' : 'https://mangosteen2.hunger-valley.com',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
})

ajax.instance.interceptors.request.use((config) => {
  const jwt = localStorage.getItem('jwt') || ''
  config.headers.Authorization = `Bearer ${jwt}`
  return config
})

const httpErrors: Record<string, undefined | (() => void)> = {
  401: () => {
    window.alert('没有权限')
    location.reload()
  },
  403: () => {
    window.alert('没有权限')
  },
  404: () => {
    window.alert('请求地址出错')
  },
  500: () => {
    window.alert('服务器内部错误')
  },
}

ajax.instance.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    if (!error.response) { return }
    const { status } = error.response
    httpErrors[status]?.()
    throw error
  },
)
