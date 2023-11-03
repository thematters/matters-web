import { describe, expect, it } from 'vitest'

import { leftPad } from './pad'

describe('utils/pad', () => {
  it('should pad a string on the left', () => {
    const result = leftPad('abc', 5)
    expect(result).toBe('  abc')
  })

  it('should not pad a string if its length is equal to the target length', () => {
    const result = leftPad('abcd', 4)
    expect(result).toBe('abcd')
  })

  it('should not pad a string if its length is greater than the target length', () => {
    const result = leftPad('abcde', 4)
    expect(result).toBe('abcde')
  })

  it('should pad a string with a custom character', () => {
    const result = leftPad('abc', 5, '-')
    expect(result).toBe('--abc')
  })
})
