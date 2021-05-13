const isProd = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'production'

const parseJSON = (data: string | null) => {
  if (!data) {
    return null
  }

  let returnData

  try {
    returnData = JSON.parse(data)
  } catch (e) {
    returnData = data
  }

  return returnData
}

/**
 * LocalStorage wrapper that supports object value
 *
 * (works on CSR)
 */
export const storage = {
  get: (key: string) => {
    if (!isProd) {
      console.log(`[storage:GET] ${key}`)
    }
    return parseJSON(localStorage.getItem(key))
  },
  set: (key: string, value: any) => {
    if (!isProd) {
      console.log(`[storage:SET] ${key}`, value)
    }
    return localStorage.setItem(key, JSON.stringify(value))
  },
  remove: (key: string) => {
    if (!isProd) {
      console.log(`[storage:REMOVE] ${key}`)
    }
    return localStorage.removeItem(key)
  },
}
