import { describe, expect, it } from 'vitest'

import { numPrefix, numRound } from './'

describe('utils/number/numPrefix', () => {
  it('should add a plus sign to positive numbers', () => {
    const result = numPrefix(1500)
    expect(result).toBe('+1500')
  })

  it('should not add a plus sign to zero', () => {
    const result = numPrefix(0)
    expect(result).toBe('0')
  })

  it('should not add a plus sign to negative numbers', () => {
    const result = numPrefix(-2000)
    expect(result).toBe('-2000')
  })
})

describe('utils/number/numRound', () => {
  it('should round to the correct decimal places', () => {
    expect(numRound(123.4563, 2)).toBe(123.46)
    expect(numRound(123.4563, 3)).toBe(123.456)
    expect(numRound(123.4333, 1)).toBe(123.4)
  })

  it('should round to the correct decimal places when the number is negative', () => {
    const result = numRound(-123.456, 2)
    expect(result).toBe(-123.46)
  })

  it('should round to the correct decimal places when the number is zero', () => {
    const result = numRound(0, 2)
    expect(result).toBe(0)
  })
})
