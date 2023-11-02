import { describe, expect, it } from 'vitest'

import toRelativeDate from './relative'

describe('utils/datetime/relative', () => {
  it('should parse a string date', () => {
    const date = '2022-01-01'
    const result = toRelativeDate(date, 'en')
    expect(typeof result).toBe('string')
  })

  it('should format a date within this minute correctly', () => {
    const date = new Date()
    const result = toRelativeDate(date, 'en')
    expect(result).toBe('just now')
  })

  it('should format a date within this hour but not this minute correctly', () => {
    const now = new Date()
    const date = new Date(now.getTime() - 1000 * 60)
    const result = toRelativeDate(date, 'en')
    expect(result).toBe('1 minute ago')
  })

  it('should format a date within today but not this hour correctly', () => {
    const now = new Date()
    const date = new Date(now.getTime() - 1000 * 60 * 60)
    const result = toRelativeDate(date, 'en')
    expect(result).toBe('1 hour ago')
  })

  it('should format a date within this week but not today correctly', () => {
    const now = new Date()
    const date = new Date(now.getTime() - 1000 * 60 * 60 * 24)
    const result = toRelativeDate(date, 'en')
    expect(result).toBe('1 day ago')
  })

  it('should format a date within this year but not this week correctly', () => {
    const date = new Date('2021-01-01')
    const result = toRelativeDate(date, 'en')
    expect(result).toBe('Jan 1, 2021')
  })

  it('should format different types of dates correctly', () => {
    // string
    const stringDate = '2021-01-01'
    const stringResult = toRelativeDate(stringDate, 'en')
    expect(stringResult).toBe('Jan 1, 2021')

    // number
    const numberDate = 1609459200000
    const numberResult = toRelativeDate(numberDate, 'en')
    expect(numberResult).toBe('Jan 1, 2021')

    // Date
    const date = new Date('2021-01-01')
    const dateResult = toRelativeDate(date, 'en')
    expect(dateResult).toBe('Jan 1, 2021')
  })
})
