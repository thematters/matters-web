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
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[storage:GET] ${key}`)
    }
    return parseJSON(localStorage.getItem(key))
  },
  set: (key: string, value: any) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[storage:SET] ${key}`, value)
    }
    return localStorage.setItem(key, JSON.stringify(value))
  },
  remove: (key: string) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[storage:REMOVE] ${key}`)
    }
    return localStorage.removeItem(key)
  },
}
