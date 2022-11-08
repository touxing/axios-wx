export type Method =
  | 'get'
  | 'post'
  | 'delete'
  | 'head'
  | 'options'
  | 'put'
  | 'trace'
  | 'connect'

export interface AxiosInterceptorManager<T> {
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number
  eject(id: number): void
}

export interface ResolvedFn<T = any> {
  (val: T): T | Promise<T>
}
export interface RejectedFn {
  (error: any): any
}

export interface RequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  timeout?: number
  baseURL?: string
  transformRequest?: RequestTransformer | RequestTransformer[]
  transformResponse?: RequestTransformer | RequestTransformer[]
  cancelToken?: CancelToken
  validateStatus?: (status: number) => boolean
  paramsSerializer?: (params: any) => string
  [propName: string]: any
}

export interface Cancel {
  message?: string
}
export interface CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel
  throwIfRequested(): void
}
export interface Canceler {
  (message?: string): void
}
export interface CancelExecutor {
  (cancel: Canceler): void
}

export interface CancelTokenSource {
  token: CancelToken
  cancel: Canceler
}
export interface CancelTokenStatic {
  new (executor: CancelExecutor): CancelToken
  source(): CancelTokenSource
}
export interface CancelStatic {
  new (message?: string): Cancel
}

export interface Request {
  default?: any
  interceptors?: {
    request: AxiosInterceptorManager<any>
    response: AxiosInterceptorManager<any>
  }
  request<T = any>(config: RequestConfig): RequestPromise<T>
  get<T = any>(url: string, config: RequestConfig): RequestPromise<T>
  post<T = any>(url: string, config: RequestConfig): RequestPromise<T>
  options<T = any>(url: string, config: RequestConfig): RequestPromise<T>

  [propName: string]: any
}

export interface RequestInstance extends Request {
  <T = any>(config: RequestConfig): RequestPromise<T>
  <T = any>(url: string, config?: RequestConfig): RequestPromise<T>
}

export interface RequestStatic extends RequestInstance {
  create(config: RequestConfig): RequestInstance

  CancelToken: CancelTokenStatic
  Cancel: CancelStatic
  isCancel: (value: any) => boolean
}

export interface RequestResponse<T = any> {
  data: T
  status: number
  statusText?: string
  headers?: any
  config: RequestConfig
  request?: any
  profile?: any // 小程序请求接口返回的调试信息
}
export interface RequestPromise<T = any> extends Promise<RequestResponse<T>> {}

export interface RequestTransformer {
  (data: any, header?: any): any
}

export interface RequestError<T = any> extends Error {
  config?: RequestConfig
  code?: string
  request?: any
  response?: RequestResponse<T>
  isAxiosError?: boolean
}
