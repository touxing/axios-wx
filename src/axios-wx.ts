import { RequestStatic, RequestConfig } from './types/index'
import { extend } from './helpers/util'
import defaults from './defaults'
import Request from './core/Request'
import CancelToken from './cancel/CancelToken'
import Cancel, { isCancel } from './cancel/Cancel'
/**
 *
 */
function createInstance(config: RequestConfig): RequestStatic {
  const context = new Request(config)
  const instance = Request.prototype.request.bind(context)

  extend(instance, context)

  return instance as RequestStatic
}

const request = createInstance(defaults as RequestConfig)

request.create = function (config: any) {
  return createInstance(extend(defaults, config))
}
request.CancelToken = CancelToken
request.Cancel = Cancel
request.isCancel = isCancel

export default request
