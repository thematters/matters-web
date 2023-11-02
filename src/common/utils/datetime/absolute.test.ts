import { describe, expect, it } from 'vitest'

import toAbsoluteDate from './absolute'

describe('utils/datetime/absolute', () => {
  it('should parse a string date', () => {
    const date = '2022-01-01'
    const result = toAbsoluteDate(date, 'en')
    expect(typeof result).toBe('string')
  })

  it("should format today's date correctly", () => {
    const date = new Date()
    const result = toAbsoluteDate(date, 'en')
    expect(result).toContain('Today')
  })

  it("should format yesterday's date correctly", () => {
    const date = new Date()
    date.setDate(date.getDate() - 1)
    const result = toAbsoluteDate(date, 'en')
    expect(result).toContain('Yesterday')
  })

  it("should format this year's date correctly", () => {
    // two days ago
    const date = new Date()
    date.setDate(date.getDate() - 2)

    const thisYear = new Date().getFullYear()
    const thisYearDate = new Date(`${thisYear}-01-01`)

    // skip test
    if (thisYearDate > date) {
      return
    }

    const result = toAbsoluteDate(thisYearDate, 'en')
    expect(result).toBe('Jan 1')
  })

  it('should format a date in the past correctly', () => {
    const date = new Date('2021-01-01')
    const result = toAbsoluteDate(date, 'en')
    expect(result).toBe('Jan 1, 2021')
  })

  it('should format a date in the future correctly', () => {
    const now = new Date()
    const date = new Date(now.getTime() + 1000 * 60 * 60 * 24 * 365)
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
