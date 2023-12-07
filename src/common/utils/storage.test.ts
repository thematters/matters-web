import { beforeEach, describe, expect, it } from 'vitest'

import { sessionStorage as sssstorage, storage } from './storage'

describe('utils/storage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should set, get and remove the item in localStorage', () => {
    const key = 'testKey'
    const value = { data: 'testData' }

    storage.set(key, value)
    expect(localStorage.getItem(key)).toBe(JSON.stringify(value))
    expect(storage.get(key)).toEqual(value)

    storage.remove(key)
    expect(localStorage.getItem(key)).toBe(null)
    expect(storage.get(key)).toEqual(null)
  })

  it('should set, get and remove the item in sessionStorage', () => {
    const key = 'testKey'
    const value = { data: 'testData' }

    sssstorage.set(key, value)
    expect(sessionStorage.getItem(key)).toBe(JSON.stringify(value))
    expect(sssstorage.get(key)).toEqual(value)

    sssstorage.remove(key)
    expect(sessionStorage.getItem(key)).toBe(null)
    expect(sssstorage.get(key)).toEqual(null)
  })
})
