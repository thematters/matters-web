import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import {
  extractShortHashFromUrl,
  isUrl,
  parseCommentHash,
  parseSorter,
  parseURL,
  stringifySorter,
  toSizedImageURL,
} from './url'

describe('utils/url/isUrl', () => {
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
    expect(isUrl('https://example.com:')).toBe(true)
  })

  it('should return false for invalid URLs', () => {
    expect(isUrl('example')).toBe(false)
    expect(isUrl('mailto:alice@example.com')).toBe(false)
    expect(isUrl('tel:88888888')).toBe(false)
    expect(isUrl('http:/example.com')).toBe(false)
    expect(isUrl('http://example')).toBe(false)
    expect(isUrl('https://example')).toBe(false)
    expect(isUrl('http://.com')).toBe(false)
    expect(isUrl('http://example.com:port')).toBe(false)
    expect(isUrl('https://example.com:port')).toBe(false)
    expect(isUrl('https://example.com:port/path')).toBe(false)
    expect(isUrl('https://example.com:port/path?query=param')).toBe(false)
    expect(isUrl('https://example.com:port/#hash')).toBe(false)
    expect(isUrl('https://example.com:port/?query=param#hash')).toBe(false)
    expect(isUrl('http://example.com:port:8080')).toBe(false)
  })
})

describe('utils/url/parseURL', () => {
  it('should parse URL', () => {
    expect(parseURL('https://example.com:8080/path?query=param#hash')).toEqual({
      protocol: 'https:',
      host: 'example.com:8080',
      hostname: 'example.com',
      port: '8080',
      pathname: '/path',
      search: '?query=param',
      hash: '#hash',
    })

    expect(parseURL('http://example.com')).toEqual({
      protocol: 'http:',
      host: 'example.com',
      hostname: 'example.com',
      port: '',
      pathname: '/',
      search: '',
      hash: '',
    })

    expect(
      parseURL(
        'https://example.com/@userName/10010-%E4%BA%94-bafybeidlgjmkj6tgtmeyeor'
      )
    ).toEqual({
      protocol: 'https:',
      host: 'example.com',
      hostname: 'example.com',
      port: '',
      pathname: '/@userName/10010-%E4%BA%94-bafybeidlgjmkj6tgtmeyeor',
      search: '',
      hash: '',
    })

    // uncommon URLs
    expect(parseURL('example.com').hostname).not.toBe('example.com')
    expect(parseURL('').hostname).not.toBe('example.com')
  })
})

describe('utils/url/parseSorter', () => {
  it('should parse sorter', () => {
    expect(parseSorter('')).toEqual({})
    expect(parseSorter('date:')).toEqual({ date: '' })
    expect(parseSorter('date')).toEqual({ date: '' })
    expect(parseSorter('date:asc')).toEqual({ date: 'asc' })
    expect(parseSorter('date: asc')).toEqual({ date: 'asc' })
    expect(parseSorter('date:asc,')).toEqual({ date: 'asc' })
    expect(parseSorter('date:asc, ')).toEqual({ date: 'asc' })
    expect(parseSorter('date:asc,like:desc')).toEqual({
      date: 'asc',
      like: 'desc',
    })
    expect(parseSorter('date:asc, like:desc')).toEqual({
      date: 'asc',
      like: 'desc',
    })
  })
})

describe('utils/url/stringifySorter', () => {
  it('should stringify sorter', () => {
    expect(stringifySorter({})).toBe('')
    expect(stringifySorter({ date: '' })).toBe('date:')
    expect(stringifySorter({ date: 'asc' })).toBe('date:asc')
    expect(stringifySorter({ date: 'asc', like: 'desc' })).toBe(
      'date:asc,like:desc'
    )
    expect(stringifySorter({ date: 'asc', like: 'desc', comment: '' })).toBe(
      'date:asc,like:desc,comment:'
    )
  })
})

describe('utils/url/toSizedImageURL', () => {
  it('should return image URL with asset domain', () => {
    const NEXT_PUBLIC_CF_IMAGE_URL = 'https://imagedelivery.net/abc/prod'
    vi.stubEnv('NEXT_PUBLIC_CF_IMAGE_URL', NEXT_PUBLIC_CF_IMAGE_URL)

    // with `/public` suffix
    expect(
      toSizedImageURL({
        url: 'https://imagedelivery.net/abc/prod/image.jpeg/public',
        width: 72,
      })
    ).toBe(
      'https://imagedelivery.net/abc/prod/image.jpeg/w=72,h=288,fit=scale-down,anim=false'
    )

    // width
    expect(
      toSizedImageURL({
        url: 'https://imagedelivery.net/abc/prod/image.jpeg',
        width: 72,
      })
    ).toBe(
      'https://imagedelivery.net/abc/prod/image.jpeg/w=72,h=288,fit=scale-down,anim=false'
    )

    // with width and height
    expect(
      toSizedImageURL({
        url: 'https://imagedelivery.net/abc/prod/image.jpeg',
        width: 72,
        height: 72,
      })
    ).toBe(
      'https://imagedelivery.net/abc/prod/image.jpeg/w=72,h=72,fit=crop,anim=false'
    )

    // with width and height and ext
    expect(
      toSizedImageURL({
        url: 'https://imagedelivery.net/abc/prod/image.jpeg',
        width: 72,
        height: 72,
        ext: 'webp',
      })
    ).toBe(
      'https://imagedelivery.net/abc/prod/image.webp/w=72,h=72,fit=crop,anim=false'
    )

    // with width and height and enableAnimation
    expect(
      toSizedImageURL({
        url: 'https://imagedelivery.net/abc/prod/image.gif',
        width: 72,
        height: 72,
        enableAnimation: false,
      })
    ).toBe(
      'https://imagedelivery.net/abc/prod/image.gif/w=72,h=72,fit=crop,anim=false'
    )
  })

  it('should return image URL with thrid-party domain', () => {
    const NEXT_PUBLIC_CF_IMAGE_URL = 'https://imagedelivery.net/abc/prod'
    vi.stubEnv('NEXT_PUBLIC_CF_IMAGE_URL', NEXT_PUBLIC_CF_IMAGE_URL)

    expect(
      toSizedImageURL({
        url: 'https://example.com/abc/prod/image.jpeg/public',
        width: 72,
      })
    ).toBe('https://example.com/abc/prod/image.jpeg/public')
  })

  it('should return image URL w/o asset domain', () => {
    // external domain
    expect(
      toSizedImageURL({
        url: 'https://example.com/abc/prod/image.jpeg/public',
        width: 72,
      })
    ).toBe('https://example.com/abc/prod/image.jpeg/public')

    // legacy domain
    expect(
      toSizedImageURL({
        url: 'https://assets.matters.news/cover/63049798-ea19-4ba1-9325-d93ae4cc4857.jpeg',
        width: 72,
      })
    ).toBe(
      'https://assets.matters.news/cover/63049798-ea19-4ba1-9325-d93ae4cc4857.jpeg'
    )
  })
})

describe('utils/url/parseCommentHash', () => {
  let originalWindow: typeof global.window

  beforeEach(() => {
    // Save the original window object
    originalWindow = global.window
    // Reset the window location hash before each test
    window.location.hash = ''
  })

  afterEach(() => {
    // Restore the original window object after each test
    global.window = originalWindow
  })

  it('should return undefined when window is undefined', () => {
    global.window = undefined as any

    const result = parseCommentHash()
    expect(result).toEqual({ parentId: undefined, descendantId: undefined })
  })

  it('should return undefined when hash is empty', () => {
    const result = parseCommentHash()
    expect(result).toEqual({
      fragment: '',
      parentId: undefined,
      descendantId: undefined,
    })
  })

  it('should return parentId and undefined descendantId when hash contains single ID', () => {
    window.location.hash = '#12345'
    const result = parseCommentHash()
    expect(result).toEqual({
      fragment: '12345',
      parentId: '12345',
      descendantId: undefined,
    })
  })

  it('should return parentId and descendantId when hash contains both IDs', () => {
    window.location.hash = '#12345-67890'
    const result = parseCommentHash()
    expect(result).toEqual({
      fragment: '12345-67890',
      parentId: '12345',
      descendantId: '67890',
    })
  })
})

describe('utils/url/extractShortHashFromUrl', () => {
  describe('Full URL format', () => {
    it('should extract shortHash from matters.town URLs', () => {
      expect(extractShortHashFromUrl('https://matters.town/a/abc123def')).toBe(
        'abc123def'
      )
      expect(extractShortHashFromUrl('http://matters.town/a/xyz789uvw')).toBe(
        'xyz789uvw'
      )
      expect(
        extractShortHashFromUrl('https://www.matters.town/a/test12345')
      ).toBe('test12345')
    })

    it('should extract shortHash from matters.icu URLs', () => {
      expect(extractShortHashFromUrl('https://matters.icu/a/abc123def')).toBe(
        'abc123def'
      )
      expect(extractShortHashFromUrl('http://matters.icu/a/xyz789uvw')).toBe(
        'xyz789uvw'
      )
      expect(
        extractShortHashFromUrl('https://www.matters.icu/a/test12345')
      ).toBe('test12345')
    })
  })

  describe('Domain format', () => {
    it('should extract shortHash from domain format URLs', () => {
      expect(extractShortHashFromUrl('matters.town/a/abc123def')).toBe(
        'abc123def'
      )
      expect(extractShortHashFromUrl('www.matters.town/a/xyz789uvw')).toBe(
        'xyz789uvw'
      )
      expect(extractShortHashFromUrl('matters.icu/a/test12345')).toBe(
        'test12345'
      )
      expect(extractShortHashFromUrl('www.matters.icu/a/demo6789')).toBe(
        'demo6789'
      )
    })
  })

  describe('Path format', () => {
    it('should extract shortHash from path format URLs', () => {
      expect(extractShortHashFromUrl('/a/abc123def')).toBe('abc123def')
      expect(extractShortHashFromUrl('/a/xyz789uvw')).toBe('xyz789uvw')
      expect(extractShortHashFromUrl('/a/test12345')).toBe('test12345')
    })
  })

  describe('Direct path format', () => {
    it('should extract shortHash from direct path format URLs', () => {
      expect(extractShortHashFromUrl('/6d1qmmmrloaf')).toBe('6d1qmmmrloaf')
      expect(extractShortHashFromUrl('/abc123def456')).toBe('abc123def456')
      expect(extractShortHashFromUrl('/xyz789uvw123')).toBe('xyz789uvw123')
    })

    it('should reject short paths (less than 8 characters)', () => {
      expect(extractShortHashFromUrl('/abc123')).toBe(null)
      expect(extractShortHashFromUrl('/short')).toBe(null)
    })
  })

  describe('Simplified format', () => {
    it('should extract shortHash from simplified format URLs', () => {
      expect(extractShortHashFromUrl('a/abc123def')).toBe('abc123def')
      expect(extractShortHashFromUrl('a/xyz789uvw')).toBe('xyz789uvw')
      expect(extractShortHashFromUrl('a/test12345')).toBe('test12345')
    })
  })

  describe('Pure shortHash format', () => {
    it('should extract shortHash from pure shortHash format', () => {
      expect(extractShortHashFromUrl('abc123def')).toBe('abc123def')
      expect(extractShortHashFromUrl('xyz789uvw')).toBe('xyz789uvw')
      expect(extractShortHashFromUrl('test12345')).toBe('test12345')
      expect(extractShortHashFromUrl('longerShortHash123456')).toBe(
        'longerShortHash123456'
      )
    })

    it('should reject short strings (less than 8 characters)', () => {
      expect(extractShortHashFromUrl('abc123')).toBe(null)
      expect(extractShortHashFromUrl('1234567')).toBe(null)
      expect(extractShortHashFromUrl('short')).toBe(null)
    })
  })

  describe('URL normalization', () => {
    it('should handle URLs with query parameters', () => {
      expect(
        extractShortHashFromUrl(
          'https://matters.town/a/abc123def?utm_source=test'
        )
      ).toBe('abc123def')
      expect(
        extractShortHashFromUrl('/a/xyz789uvw?param=value&other=test')
      ).toBe('xyz789uvw')
      expect(extractShortHashFromUrl('a/test12345?query=1')).toBe('test12345')
    })

    it('should handle URLs with hash fragments', () => {
      expect(
        extractShortHashFromUrl('https://matters.town/a/abc123def#section')
      ).toBe('abc123def')
      expect(extractShortHashFromUrl('/a/xyz789uvw#comment-123')).toBe(
        'xyz789uvw'
      )
      expect(extractShortHashFromUrl('a/test12345#top')).toBe('test12345')
    })

    it('should handle URLs with trailing slashes', () => {
      expect(extractShortHashFromUrl('https://matters.town/a/abc123def/')).toBe(
        'abc123def'
      )
      expect(extractShortHashFromUrl('/a/xyz789uvw/')).toBe('xyz789uvw')
      expect(extractShortHashFromUrl('a/test12345/')).toBe('test12345')
    })

    it('should handle URLs with both query parameters and hash fragments', () => {
      expect(
        extractShortHashFromUrl(
          'https://matters.town/a/abc123def?param=value#section'
        )
      ).toBe('abc123def')
      expect(extractShortHashFromUrl('/a/xyz789uvw?query=1#comment')).toBe(
        'xyz789uvw'
      )
    })

    it('should handle URLs with leading/trailing whitespace', () => {
      expect(
        extractShortHashFromUrl('  https://matters.town/a/abc123def  ')
      ).toBe('abc123def')
      expect(extractShortHashFromUrl('\t/a/xyz789uvw\n')).toBe('xyz789uvw')
      expect(extractShortHashFromUrl(' a/test12345 ')).toBe('test12345')
    })
  })

  describe('Invalid inputs', () => {
    it('should return null for empty or null inputs', () => {
      expect(extractShortHashFromUrl('')).toBe(null)
      expect(extractShortHashFromUrl(null as any)).toBe(null)
      expect(extractShortHashFromUrl(undefined as any)).toBe(null)
    })

    it('should return null for non-article URLs', () => {
      expect(extractShortHashFromUrl('https://matters.town/user/profile')).toBe(
        null
      )
      expect(extractShortHashFromUrl('https://matters.town/home')).toBe(null)
      expect(extractShortHashFromUrl('https://example.com/a/abc123def')).toBe(
        null
      )
    })

    it('should return null for invalid shortHash characters', () => {
      expect(extractShortHashFromUrl('https://matters.town/a/abc-123')).toBe(
        null
      )
      expect(extractShortHashFromUrl('https://matters.town/a/abc_123')).toBe(
        null
      )
      expect(extractShortHashFromUrl('https://matters.town/a/abc@123')).toBe(
        null
      )
    })

    it('should return null for malformed URLs', () => {
      expect(extractShortHashFromUrl('matters.town/b/abc123def')).toBe(null)
      expect(extractShortHashFromUrl('/b/abc123def')).toBe(null)
      expect(extractShortHashFromUrl('b/abc123def')).toBe(null)
    })

    it('should return null for paths that are not valid formats', () => {
      expect(extractShortHashFromUrl('/6d1qmmmrloaf')).toBe('6d1qmmmrloaf')
      expect(extractShortHashFromUrl('/user/profile')).toBe(null)
      expect(extractShortHashFromUrl('/home')).toBe(null)
      expect(extractShortHashFromUrl('/12345678')).toBe('12345678')
      expect(extractShortHashFromUrl('/abc123def456')).toBe('abc123def456')
      expect(extractShortHashFromUrl('/path/with/slashes')).toBe(null)
    })
  })

  describe('Edge cases', () => {
    it('should handle URLs with ports', () => {
      expect(
        extractShortHashFromUrl('https://matters.town:443/a/abc123def')
      ).toBe('abc123def')
      expect(
        extractShortHashFromUrl('http://matters.icu:8080/a/xyz789uvw')
      ).toBe('xyz789uvw')
    })

    it('should handle subdomains', () => {
      expect(
        extractShortHashFromUrl('https://api.matters.town/a/abc123def')
      ).toBe('abc123def')
      expect(
        extractShortHashFromUrl('https://test.matters.icu/a/xyz789uvw')
      ).toBe('xyz789uvw')
    })

    it('should handle mixed case shortHash', () => {
      expect(extractShortHashFromUrl('https://matters.town/a/AbC123DeF')).toBe(
        'AbC123DeF'
      )
      expect(extractShortHashFromUrl('/a/XyZ789UvW')).toBe('XyZ789UvW')
    })
  })
})
