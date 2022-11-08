export function parseHeaders(headers: string): any {
  let parsed = Object.create(null)
  if (!headers) {
    return parsed
  }

  headers.split('\r\n').forEach((line) => {
    let [key, ...vals] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) {
      return
    }

    let val = vals.join(':').trim()
    parsed[key] = val
  })

  return parsed
}
