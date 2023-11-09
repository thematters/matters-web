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
    if (process.env.DEBUG) {
      console.log(`[storage:GET] ${key}`)
    }
    return parseJSON(localStorage.getItem(key))
  },
  set: (key: string, value: any) => {
    if (process.env.DEBUG) {
      console.log(`[storage:SET] ${key}`, value)
    }
    return localStorage.setItem(key, JSON.stringify(value))
  },
  remove: (key: string) => {
    if (process.env.DEBUG) {
      console.log(`[storage:REMOVE] ${key}`)
    }
    const item = parseJSON(localStorage.getItem(key))
    localStorage.removeItem(key)
    return item
  },
}

/**
 * SessionStorage wrapper that supports object value
 *
 * (works on CSR)
 */
export const sessionStorage = {
  get: (key: string) => {
    if (process.env.DEBUG) {
      console.log(`[storage:GET] ${key}`)
    }
    return parseJSON(window.sessionStorage.getItem(key))
  },
  set: (key: string, value: any) => {
    if (process.env.DEBUG) {
      console.log(`[storage:SET] ${key}`, value)
    }
    return window.sessionStorage.setItem(key, JSON.stringify(value))
  },
  remove: (key: string) => {
    if (process.env.DEBUG) {
      console.log(`[storage:REMOVE] ${key}`)
    }
    const item = parseJSON(window.sessionStorage.getItem(key))
    window.sessionStorage.removeItem(key)
    return item
  },
}
