import { describe, expect, it } from 'vitest'

import {
  isValidEmail,
  isValidPassword,
  isValidPaymentPassword,
} from './validator'

describe('utils/validator/isValidEmail', () => {
  it('should return true for valid emails', () => {
    const allowPlusSign = false
    expect(isValidEmail('alice@example.com', { allowPlusSign })).toBe(true)
    expect(isValidEmail('alice@example.com', { allowPlusSign })).toBe(true)
  })
})

describe('utils/validator/isValidPassword', () => {
  it('should return true for valid passwords', () => {
    expect(isValidPassword('12345678')).toBe(true)
    expect(isValidPassword('abcdefgh')).toBe(true)
    expect(isValidPassword('ABCDEFGH')).toBe(true)
    expect(isValidPassword('!@#$%^&*')).toBe(true)
    expect(isValidPassword('123abcDEF%^&*')).toBe(true)
    expect(isValidPassword('        ')).toBe(true)
  })

  it('should return false for invalid passwords', () => {
    // length
    expect(isValidPassword('12345')).toBe(false)

    // non-ASCII
    expect(isValidPassword('你好世界你好世界')).toBe(false)
  })
})

describe('utils/validator/isValidPaymentPassword', () => {
  it('should return true for valid payment passwords', () => {
    expect(isValidPaymentPassword('123456')).toBe(true)
  })

  it('should return false for invalid payment passwords', () => {
    expect(isValidPaymentPassword('12345')).toBe(false)
    expect(isValidPaymentPassword('1234567')).toBe(false)
    expect(isValidPassword('abcdef')).toBe(false)
    expect(isValidPassword('ABCDEF')).toBe(false)
    expect(isValidPassword('!@#$%^')).toBe(false)
    expect(isValidPassword('1aEF%*')).toBe(false)
    expect(isValidPassword('      ')).toBe(false)
    expect(isValidPassword('你好世界你你')).toBe(false)
  })
})
