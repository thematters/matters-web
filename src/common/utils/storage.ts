const isLocal = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'local'

const parseJSON = (data: string | null) => {
  if (!data) {
    return null
  }

  let returnData

  try {
    returnData = JSON.parse(data)
  } catch {
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
  get: <T>(key: string): T | null => {
    if (isLocal) {
      console.log(`[storage:GET] ${key}`)
    }
    if (typeof window === 'undefined') {
      return null
    }
    return parseJSON(window.localStorage.getItem(key))
  },
  set: <T>(key: string, value: T) => {
    if (isLocal) {
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
  remove: <T>(key: string): T | null => {
    if (isLocal) {
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
  get: <T>(key: string): T | null => {
    if (isLocal) {
      console.log(`[sessionStorage:GET] ${key}`)
    }
    if (typeof window === 'undefined') {
      return null
    }
    return parseJSON(window.sessionStorage.getItem(key))
  },
  set: <T>(key: string, value: T) => {
    if (isLocal) {
      console.log(`[sessionStorage:SET] ${key}`, value)
    }
    window.sessionStorage.setItem(key, JSON.stringify(value))
  },
  remove: <T>(key: string): T | null => {
    if (isLocal) {
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
type FormStorageKey = `form-draft:${string}:${string}`
type FormStorageType = 'session' | 'local'
type FormGenKeyProps = {
  authorId: string
  formId: string
}
type FormGenArticleCommentKeyProps = {
  authorId: string
  articleId: string
  parentId?: string
  replyToId?: string
}

type FormGenCircleCommentKeyProps = {
  authorId: string
  circleId: string
  type: string
  parentId?: string
  replyToId?: string
  commentId?: string
}

export const formStorage = {
  genKey: ({ authorId, formId }: FormGenKeyProps): FormStorageKey =>
    `form-draft:${authorId}:${formId}`,
  genArticleCommentKey: ({
    authorId,
    articleId,
    parentId,
    replyToId,
  }: FormGenArticleCommentKeyProps): FormStorageKey =>
    `form-draft:${authorId}:${articleId}:${parentId || 0}:${replyToId || 0}`,
  genCircleCommentKey: ({
    authorId,
    circleId,
    type,
    parentId,
    replyToId,
    commentId,
  }: FormGenCircleCommentKeyProps): FormStorageKey =>
    `form-draft:${authorId}:${circleId}:${type}:${parentId || 0}:${
      replyToId || 0
    }:${commentId || 0}`,
  get: <T>(key: FormStorageKey, type: FormStorageType): T | null => {
    return type === 'session' ? sessionStorage.get<T>(key) : storage.get<T>(key)
  },
  set: <T>(key: FormStorageKey, value: T, type: FormStorageType) => {
    if (type === 'session') {
      sessionStorage.set(key, value)
    } else {
      storage.set(key, value)
    }
  },
  remove: <T>(key: FormStorageKey, type: FormStorageType): T | null => {
    if (type === 'session') {
      return sessionStorage.remove<T>(key)
    } else {
      return storage.remove<T>(key)
    }
  },
}
