import { beforeEach, describe, expect, it, vi } from 'vitest'

import toAbsoluteDate from './absolute'

beforeEach(() => {
  vi.setSystemTime(new Date(2023, 6, 1))
})

describe('utils/datetime/absolute', () => {
  it('should parse a string date', () => {
    const date = '2022-01-01'
    const result = toAbsoluteDate(date, 'en')
    expect(typeof result).toBe('string')
  })

  it("should format today's date correctly", () => {
    const date = new Date(2023, 6, 1)
    const result = toAbsoluteDate(date, 'en')
    expect(result).toContain('Today')
  })

  it("should format yesterday's date correctly", () => {
    const date = new Date(2023, 6, 0)
    const result = toAbsoluteDate(date, 'en')
    expect(result).toContain('Yesterday')
  })

  it("should format this year's date correctly", () => {
    const result = toAbsoluteDate(new Date('2023-01-01'), 'en')
    expect(result).toBe('Jan 1')
  })

  it('should format a date in the past correctly', () => {
    const date = new Date('2021-01-01')
    const result = toAbsoluteDate(date, 'en')
    expect(result).toBe('Jan 1, 2021')
  })

  it('should format a date in the future correctly', () => {
    const date = new Date('2025-01-01')
    const result = toAbsoluteDate(date, 'en')
    expect(result).toContain(date.getFullYear())
  })

  it('should format different types of dates correctly', () => {
    // string
    const stringDate = '2021-01-01'
    const stringResult = toAbsoluteDate(stringDate, 'en')
    expect(stringResult).toBe('Jan 1, 2021')

    // number
    const numberDate = 1609459200000
    const numberResult = toAbsoluteDate(numberDate, 'en')
    expect(numberResult).toBe('Jan 1, 2021')

    // Date
    const date = new Date('2021-01-01')
    const dateResult = toAbsoluteDate(date, 'en')
    expect(dateResult).toBe('Jan 1, 2021')
  })
})
