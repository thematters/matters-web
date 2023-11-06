import { beforeEach, describe, expect, it, vi } from 'vitest'

import toRelativeDate from './relative'

beforeEach(() => {
  vi.setSystemTime(new Date(2023, 6, 1, 8, 30, 0))
})

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
    expect(toRelativeDate(new Date(2023, 6, 1, 8, 29), 'en')).toBe(
      '1 minute ago'
    )
    expect(toRelativeDate(new Date(2023, 6, 1, 8, 28), 'en')).toBe(
      '2 minutes ago'
    )
  })

  it('should format a date within today but not this hour correctly', () => {
    expect(toRelativeDate(new Date(2023, 6, 1, 7, 30, 0), 'en')).toBe(
      '1 hour ago'
    )
    expect(toRelativeDate(new Date(2023, 6, 1, 6, 20, 0), 'en')).toBe(
      '2 hours ago'
    )
  })

  it('should format a date within this week but not today correctly', () => {
    expect(toRelativeDate(new Date('2023-06-30'), 'en')).toBe('1 day ago')
    expect(toRelativeDate(new Date('2023-06-26'), 'en')).toBe('5 days ago')
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
