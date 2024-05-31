import { describe, expect, it } from 'vitest'

import {
  checkIsSafariVersionLessThan17,
  getUserAgent,
  isMobile,
} from './detect'

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

describe('utils/detect/checkIsSafariVersionLessThan17', () => {
  it('should return true for Safari version less than 17', () => {
    const originalUserAgent = navigator.userAgent
    Object.defineProperty(navigator, 'userAgent', {
      value:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Safari/605.1.15',
      configurable: true,
    })

    expect(checkIsSafariVersionLessThan17()).toBe(true)

    Object.defineProperty(navigator, 'userAgent', {
      value: originalUserAgent,
      configurable: true,
    })
  })

  it('should return false for Safari version 17 or greater', () => {
    const originalUserAgent = navigator.userAgent
    Object.defineProperty(navigator, 'userAgent', {
      value:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
      configurable: true,
    })

    expect(checkIsSafariVersionLessThan17()).toBe(false)

    Object.defineProperty(navigator, 'userAgent', {
      value: originalUserAgent,
      configurable: true,
    })
  })

  it('should return true for Safari 16 on Apple M series chip', () => {
    const originalUserAgent = navigator.userAgent
    Object.defineProperty(navigator, 'userAgent', {
      value:
        'Mozilla/5.0 (Macintosh; Apple Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Safari/605.1.15',
      configurable: true,
    })

    expect(checkIsSafariVersionLessThan17()).toBe(true)

    Object.defineProperty(navigator, 'userAgent', {
      value: originalUserAgent,
      configurable: true,
    })
  })

  it('should return false for Safari 17 on Apple M series chip', () => {
    const originalUserAgent = navigator.userAgent
    Object.defineProperty(navigator, 'userAgent', {
      value:
        'Mozilla/5.0 (Macintosh; Apple Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
      configurable: true,
    })

    expect(checkIsSafariVersionLessThan17()).toBe(false)

    Object.defineProperty(navigator, 'userAgent', {
      value: originalUserAgent,
      configurable: true,
    })
  })

  it('should return false for non-Safari browsers', () => {
    const originalUserAgent = navigator.userAgent
    Object.defineProperty(navigator, 'userAgent', {
      value:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      configurable: true,
    })

    expect(checkIsSafariVersionLessThan17()).toBe(false)

    Object.defineProperty(navigator, 'userAgent', {
      value: originalUserAgent,
      configurable: true,
    })
  })

  it('should return false if version is not found', () => {
    const originalUserAgent = navigator.userAgent
    Object.defineProperty(navigator, 'userAgent', {
      value:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Safari/605.1.15',
      configurable: true,
    })

    expect(checkIsSafariVersionLessThan17()).toBe(false)

    Object.defineProperty(navigator, 'userAgent', {
      value: originalUserAgent,
      configurable: true,
    })
  })
})
