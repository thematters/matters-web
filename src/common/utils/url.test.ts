import { describe, expect, it } from 'vitest'

import { isUrl } from './url'

describe('utils/url', () => {
  it('should return true for valid URLs', () => {
    expect(isUrl('example.com')).toBe(true)
    expect(isUrl('http://example.com')).toBe(true)
    expect(isUrl('https://example.com')).toBe(true)
    expect(isUrl('https://www.example.com')).toBe(true)
    expect(isUrl('https://example.com/path')).toBe(true)
    expect(isUrl('https://example.com/path?query=param')).toBe(true)
    expect(
      isUrl(
        'https://example.com/@userName/10010-%E4%BA%94-bafybeidlgjmkj6tgtmeyeor'
      )
    ).toBe(true)
    expect(isUrl('https://example.com/#hash')).toBe(true)
    expect(isUrl('https://example.com/?query=param#hash')).toBe(true)
    expect(isUrl('http://example.com:8080')).toBe(true)
    expect(isUrl('http://example.com:8080/path')).toBe(true)
    expect(isUrl('http://example.com:8080/path?query=param')).toBe(true)
    expect(isUrl('http://example.com:8080/#hash')).toBe(true)

    // unusual but valid
    expect(isUrl('http:/example.com')).toBe(false)
    expect(isUrl('http://example')).toBe(false)
    expect(isUrl('https://example')).toBe(false)
    expect(isUrl('http://.com')).toBe(false)
    expect(isUrl('https://example.com:')).toBe(false)
  })

  it('should return false for invalid URLs', () => {
    expect(isUrl('example')).toBe(false)
    expect(isUrl('http://example.com:port')).toBe(false)
    expect(isUrl('https://example.com:port')).toBe(false)
    expect(isUrl('https://example.com:port/path')).toBe(false)
    expect(isUrl('https://example.com:port/path?query=param')).toBe(false)
    expect(isUrl('https://example.com:port/#hash')).toBe(false)
    expect(isUrl('https://example.com:port/?query=param#hash')).toBe(false)
    expect(isUrl('http://example.com:port:8080')).toBe(false)
  })
})
