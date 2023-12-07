import { describe, expect, it } from 'vitest'

import { getUserAgent, isMobile } from './detect'

describe('utils/detect/getUserAgent', () => {
  it('should return the user agent in lowercase', () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value: 'TestAgent',
      configurable: true,
    })
    expect(getUserAgent()).toBe('testagent')
  })
})

describe('utils/detect/isMobile', () => {
  it('should return true for mobile user agents', () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value: 'iPhone',
      configurable: true,
    })
    expect(isMobile()).toBe(true)
  })

  it('should return false for non-mobile user agents', () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value: 'Windows NT',
      configurable: true,
    })
    expect(isMobile()).toBe(false)
  })
})
