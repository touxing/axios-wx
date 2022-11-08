import { buildURL, combineURL, isAbsoluteURL } from '../helpers/url'
import { RequestConfig, RequestPromise, RequestResponse } from '../types'
import ajax from './ajax'
import transform from './transform'

export default function dispatchRequest(config: RequestConfig): RequestPromise {
  throwIfRequested(config)
  processCofnig(config)
  return ajax(config)
    .then((res) => {
      return transformResponseData(res)
    })
    .catch((e) => {
      if (e && e.response) {
        e.response = transformResponseData(e.response)
      }
      return Promise.reject(e)
    })
}

function processCofnig(config: RequestConfig) {
  config.url = transformURL(config)
  config.header = config.headers
}

function transformURL(config: RequestConfig): string {
  let { url, params, paramsSerializer, baseURL } = config
  if (baseURL && !isAbsoluteURL(url!)) {
    url = combineURL(url!)
  }
  return buildURL(url!, params, paramsSerializer)
}

function throwIfRequested(config: RequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested
  }
}

function transformResponseData(res: RequestResponse): RequestResponse {
  res.data = transform(res.data, res.headers, res.config.transformResponse!)
  return res
}
