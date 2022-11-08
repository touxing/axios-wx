export const toString = Object.prototype.toString

const typeOfTest = (type: any) => (thing: any) => typeof thing === type

export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

export function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object'
}

export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

export function isDef(val: any): boolean {
  return typeof val !== 'undefined'
}

export function isUnDef(val: any): boolean {
  return typeof val === 'undefined'
}

/**
 * Determine if a value is a String
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a String, otherwise false
 */
export const isString = typeOfTest('string')

export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

export function deepMerge(...objs: any[]): any {
  const result = Object.create(null)

  objs.forEach((obj) => {
    if (obj) {
      Object.keys(obj).forEach((key) => {
        const val = obj[key]
        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge({}, val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })
  return result
}

export function isFormData(val: any): boolean {
  return isDef(val) && val instanceof FormData
}

export function isURLSearchParams(val: any): val is URLSearchParams {
  return isDef(val) && val instanceof URLSearchParams
}
