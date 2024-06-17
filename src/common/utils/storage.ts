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

// via https://mmazzarolo.com/blog/2022-06-25-local-storage-status/
function isQuotaExceededError(err: unknown): boolean {
  return (
    err instanceof DOMException &&
    // everything except Firefox
    (err.code === 22 ||
      // Firefox
      err.code === 1014 ||
      // test name field too, because code might not be present
      // everything except Firefox
      err.name === 'QuotaExceededError' ||
      // Firefox
      err.name === 'NS_ERROR_DOM_QUOTA_REACHED')
  )
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
    return parseJSON(window.localStorage.getItem(key))
  },
  set: (key: string, value: any) => {
    if (process.env.DEBUG) {
      console.log(`[storage:SET] ${key}`, value)
    }

    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (err) {
      if (isQuotaExceededError(err)) {
        // clear all and set again
        window.localStorage.clear()
        window.localStorage.setItem(key, JSON.stringify(value))
      } else {
        console.error('Local storage not supported')
      }
    }
  },
  remove: (key: string) => {
    if (process.env.DEBUG) {
      console.log(`[storage:REMOVE] ${key}`)
    }
    const item = parseJSON(window.localStorage.getItem(key))
    window.localStorage.removeItem(key)
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
      console.log(`[sessionStorage:GET] ${key}`)
    }
    return parseJSON(window.sessionStorage.getItem(key))
  },
  set: (key: string, value: any) => {
    if (process.env.DEBUG) {
      console.log(`[sessionStorage:SET] ${key}`, value)
    }
    window.sessionStorage.setItem(key, JSON.stringify(value))
  },
  remove: (key: string) => {
    if (process.env.DEBUG) {
      console.log(`[sessionStorage:REMOVE] ${key}`)
    }
    const item = parseJSON(window.sessionStorage.getItem(key))
    window.sessionStorage.removeItem(key)
    return item
  },
}

/**
 * Store form draft in session or local storage
 *
 * Use cases:
 * - Comment
 * - Edit profile
 * - ...
 */
type FormDraftStorageKey = `form-draft:${string}:${string}`
type FormDraftStorageType = 'session' | 'local'
type FormDraftGenKeyProps = {
  authorId: string
  formId: string
}

export const formDraft = {
  genKey: ({ authorId, formId }: FormDraftGenKeyProps): FormDraftStorageKey =>
    `form-draft:${authorId}:${formId}`,
  get: (key: FormDraftStorageKey, type: FormDraftStorageType) => {
    return type === 'session' ? sessionStorage.get(key) : storage.get(key)
  },
  set: (key: FormDraftStorageKey, value: any, type: FormDraftStorageType) => {
    type === 'session'
      ? sessionStorage.set(key, value)
      : storage.set(key, value)
  },
  remove: (key: FormDraftStorageKey, type: FormDraftStorageType) => {
    if (type === 'session') {
      return sessionStorage.remove(key)
    } else {
      return storage.remove(key)
    }
  },
}
