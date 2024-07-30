import { beforeEach, describe, expect, it, vi } from 'vitest'

import toAbsoluteDate from './absolute'

beforeEach(() => {
  vi.setSystemTime(new Date(2023, 6, 1))
})

describe('utils/datetime/absolute', () => {
  it('should parse a string date', () => {
    const date = '2022-01-01'
    const result = toAbsoluteDate({ date: date, lang: 'en' })
    expect(typeof result).toBe('string')
  })

  it("should format this year's date correctly", () => {
    expect(toAbsoluteDate({ date: new Date('2023-01-01'), lang: 'en' })).toBe(
      'Jan 1'
    )

    expect(
      toAbsoluteDate({
        date: new Date('2023-01-01'),
        lang: 'en',
        optionalYear: false,
      })
    ).toBe('Jan 1, 2023')
  })

  it('should format a date in the past correctly', () => {
    const date = new Date('2021-01-01')
    const result = toAbsoluteDate({ date: date, lang: 'en' })
    expect(result).toBe('Jan 1, 2021')
  })

  it('should format a date in the future correctly', () => {
    const date = new Date('2025-01-01')
    const result = toAbsoluteDate({ date: date, lang: 'en' })
    expect(result).toContain(date.getFullYear())
  })

  it('should format different types of dates correctly', () => {
    // string
    const stringDate = '2021-01-01'
    const stringResult = toAbsoluteDate({ date: stringDate, lang: 'en' })
    expect(stringResult).toBe('Jan 1, 2021')

    // number
    const numberDate = 1609459200000
    const numberResult = toAbsoluteDate({ date: numberDate, lang: 'en' })
    expect(numberResult).toBe('Jan 1, 2021')

    // Date
    const date = new Date('2021-01-01')
    const dateResult = toAbsoluteDate({ date: date, lang: 'en' })
    expect(dateResult).toBe('Jan 1, 2021')
  })

  it('should format a date in UTC+8 correctly', () => {
    const date = new Date('2021-01-01T17:00:00.000Z')

    // UTC+8
    expect(toAbsoluteDate({ date: date, lang: 'en', utc8: true })).toBe(
      'Jan 2, 2021'
    )
  })
})

describe('utils/datetime/absolute/dateISO', () => {
  it('should parse a string date', () => {
    const date = '2022-01-01'
    const result = toAbsoluteDate.dateISO(date)
    expect(typeof result).toBe('string')
  })

  it('should format a date correctly', () => {
    const date = new Date('2021-01-01')
    const result = toAbsoluteDate.dateISO(date)
    expect(result).toBe('2021-01-01')
  })
})

describe('utils/datetime/absolute/timeISO', () => {
  it('should parse a string date', () => {
    const date = '2022-01-01T12:34:56'
    const result = toAbsoluteDate.timeISO(date)
    expect(typeof result).toBe('string')
  })

  it('should format a date correctly', () => {
    const date = new Date('2021-01-01T12:34:56')
    const result = toAbsoluteDate.timeISO(date)
    expect(result).toBe('12:34')
  })
})
