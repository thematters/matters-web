import { describe, expect, it } from 'vitest'

import { normalizePassowrd, normalizeUserName } from './user'

describe('utils/text/user/normalizePassowrd', () => {
  it('should normalize password correctly', () => {
    expect(normalizePassowrd('hello')).toBe('hello')
    expect(normalizePassowrd('Hello, world!')).toBe('Hello, world!')
    expect(normalizePassowrd('Hello, 你好，👋🌍!')).toBe('Hello, !')
    expect(normalizePassowrd('你好')).toBe('')
    expect(normalizePassowrd('')).toBe('')
    expect(normalizePassowrd('+,.?!@#$%')).toBe('+,.?!@#$%')
  })
})

describe('utils/text/user/normalizeUserName', () => {
  it('should normalize username correctly', () => {
    expect(normalizeUserName('hello')).toBe('hello')
    expect(normalizeUserName('Hello, world!')).toBe('elloworld')
    expect(normalizeUserName('Hello, 你好，👋🌍!')).toBe('ello')
    expect(normalizeUserName('你好')).toBe('')
    expect(normalizeUserName('')).toBe('')
    expect(normalizeUserName('+,.?!@#$%')).toBe('')
  })
})
