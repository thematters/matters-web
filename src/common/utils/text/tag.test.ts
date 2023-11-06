import { describe, expect, it } from 'vitest'

import { MAX_TAG_CONTENT_LENGTH } from '~/common/enums'

import { clampTag, normalizeTag, slugifyTag } from './tag'

describe('utils/text/tag/slugifyTag', () => {
  it('should slugify tag correctly', () => {
    expect(slugifyTag('hello')).toBe('hello')
    expect(slugifyTag('--Hello, world!--')).toBe('Hello-world')
    expect(slugifyTag('Hello, 你好，👋🌍!')).toBe('Hello-你好')
    expect(slugifyTag('你好')).toBe('你好')
    expect(slugifyTag('')).toBe('')
  })
})

describe('utils/text/tag/normalizeTag', () => {
  it('should normalize tag correctly', () => {
    expect(normalizeTag('hello')).toBe('hello')
    expect(normalizeTag('Hello, world!')).toBe('Hello world')
    expect(normalizeTag('Hello, 你好，👋🌍!')).toBe('Hello 你好')
    expect(normalizeTag('你好')).toBe('你好')
    expect(normalizeTag('')).toBe('')
    expect(normalizeTag('+,.?!@#$%')).toBe('')
    expect(normalizeTag('a'.repeat(100))).toBe(
      'a'.repeat(MAX_TAG_CONTENT_LENGTH)
    )
  })
})

describe('utils/text/tag/clampTag', () => {
  it('should clamp tag correctly', () => {
    expect(clampTag('hello')).toBe('hello')
    expect(clampTag('Hello, world!')).toBe('Hello, world!')
    expect(clampTag('Hello, 你好，👋🌍!')).toBe('Hello, …')
    expect(clampTag('你好')).toBe('你好')
    expect(clampTag('')).toBe('')
    expect(clampTag('+,.?!@#$%')).toBe('+,.?!@#$%')
    expect(clampTag('a'.repeat(100))).toBe('aaaaaaaaaaaaaaaaaaaa…')
  })
})
