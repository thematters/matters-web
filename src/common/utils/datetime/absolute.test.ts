import { beforeEach, describe, expect, it, vi } from 'vitest'

import absolute from './absolute'

beforeEach(() => {
  vi.setSystemTime(new Date(2023, 6, 1, 8, 30, 0))
})

describe('utils/datetime/absolute', () => {
  describe('default function', () => {
    it('should format a date correctly with default options', () => {
      const date = new Date(2023, 0, 1) // 2023-01-01
      expect(absolute({ date, lang: 'en' })).toBe('Jan 1')
      expect(absolute({ date, lang: 'zh_hant' })).toBe('1 月 1 日')
      expect(absolute({ date, lang: 'zh_hans' })).toBe('1 月 1 日')
    })

    it('should include year when not this year', () => {
      const date = new Date(2022, 0, 1) // 2022-01-01
      expect(absolute({ date, lang: 'en' })).toBe('Jan 1, 2022')
      expect(absolute({ date, lang: 'zh_hant' })).toBe('2022 年 1 月 1 日')
      expect(absolute({ date, lang: 'zh_hans' })).toBe('2022 年 1 月 1 日')
    })

    it('should include year when optionalYear is false', () => {
      const date = new Date(2023, 0, 1) // 2023-01-01 (this year)
      expect(absolute({ date, lang: 'en', optionalYear: false })).toBe(
        'Jan 1, 2023'
      )
      expect(absolute({ date, lang: 'zh_hant', optionalYear: false })).toBe(
        '2023 年 1 月 1 日'
      )
      expect(absolute({ date, lang: 'zh_hans', optionalYear: false })).toBe(
        '2023 年 1 月 1 日'
      )
    })
  })

  describe('dateISO', () => {
    it('should format a date in ISO format', () => {
      expect(absolute.dateISO(new Date(2023, 0, 1))).toBe('2023-01-01')
      expect(absolute.dateISO(new Date(2022, 11, 31))).toBe('2022-12-31')
    })
  })

  describe('timeISO', () => {
    it('should format a time in ISO format', () => {
      expect(absolute.timeISO(new Date(2023, 0, 1, 14, 30))).toBe('14:30')
      expect(absolute.timeISO(new Date(2023, 0, 1, 9, 5))).toBe('09:05')
    })
  })

  describe('monthDay', () => {
    it('should format month and day correctly', () => {
      expect(absolute.monthDay('2023-02-15', 'en')).toBe('February 15')
      expect(absolute.monthDay('2023-02-15', 'zh_hant')).toBe('2 月 15 日')
      expect(absolute.monthDay('2023-02-15', 'zh_hans')).toBe('2 月 15 日')
    })

    it('should return null for invalid input', () => {
      expect(absolute.monthDay(undefined)).toBeNull()
    })
  })

  describe('minimalDate', () => {
    it('should format dates from current year as MM-DD', () => {
      expect(absolute.minimalDate(new Date(2023, 0, 1))).toBe('01-01')
      expect(absolute.minimalDate(new Date(2023, 5, 15))).toBe('06-15')
      expect(absolute.minimalDate(new Date(2023, 11, 31))).toBe('12-31')
    })

    it('should format dates from other years as YYYY-MM-DD', () => {
      expect(absolute.minimalDate(new Date(2022, 0, 1))).toBe('2022-01-01')
      expect(absolute.minimalDate(new Date(2021, 5, 15))).toBe('2021-06-15')
      expect(absolute.minimalDate(new Date(2024, 11, 31))).toBe('2024-12-31')
    })

    it('should handle string dates correctly', () => {
      expect(absolute.minimalDate('2023-01-01')).toBe('01-01')
      expect(absolute.minimalDate('2022-06-15')).toBe('2022-06-15')
    })
  })
})
