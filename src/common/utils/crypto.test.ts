import { describe, expect, it } from 'vitest'

import { randomString } from './crypto'

describe('utils/crypto/randomString', () => {
  it('should generate a random string', () => {
    const result = randomString()
    const result2 = randomString()
    expect(result).toHaveLength(9)
    expect(result2).toHaveLength(9)
    expect(result).not.toBe(result2)
  })

  it('should generate a random string with a custom length', () => {
    const result = randomString(5)
    const result2 = randomString(5)
    expect(result).toHaveLength(5)
    expect(result2).toHaveLength(5)
    expect(result).not.toBe(result2)
  })
})
