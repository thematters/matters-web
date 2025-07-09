import { beforeEach, describe, expect, it, vi } from 'vitest'

import toRelativeDate from './relative'

beforeEach(() => {
  vi.setSystemTime(new Date(2023, 6, 1, 8, 30, 0))
})

describe('utils/datetime/relative', () => {
  describe('standard format', () => {
    it('should parse a string date', () => {
      const date = '2022-01-01'
      const result = toRelativeDate(date, 'en')
      expect(typeof result).toBe('string')
    })

    it('should format a date within this minute correctly', () => {
      const date = new Date()
      expect(toRelativeDate(date, 'en')).toBe('Now')
      expect(toRelativeDate(date, 'zh_hant')).toBe('剛剛')
      expect(toRelativeDate(date, 'zh_hans')).toBe('刚刚')
    })

    it('should format a date within this hour but not this minute correctly', () => {
      expect(toRelativeDate(new Date(2023, 6, 1, 8, 29), 'en')).toBe('Now')
      expect(toRelativeDate(new Date(2023, 6, 1, 8, 28), 'en')).toBe(
        '2 minutes ago'
      )
      expect(toRelativeDate(new Date(2023, 6, 1, 8, 28), 'zh_hant')).toBe(
        '2 分鐘前'
      )
      expect(toRelativeDate(new Date(2023, 6, 1, 8, 28), 'zh_hans')).toBe(
        '2 分钟前'
      )
    })

    it('should format a date within today but not this hour correctly', () => {
      expect(toRelativeDate(new Date(2023, 6, 1, 7, 30, 0), 'en')).toBe(
        '1 hour ago'
      )
      expect(toRelativeDate(new Date(2023, 6, 1, 6, 20, 0), 'en')).toBe(
        '2 hours ago'
      )
      expect(toRelativeDate(new Date(2023, 6, 1, 7, 30, 0), 'zh_hant')).toBe(
        '1 小時前'
      )
      expect(toRelativeDate(new Date(2023, 6, 1, 6, 20, 0), 'zh_hans')).toBe(
        '2 小时前'
      )
    })

    it('should format a date exactly 24 hours ago correctly', () => {
      const date = new Date(2023, 5, 30, 8, 30, 0)
      const result = toRelativeDate(date, 'en')
      expect(result).toBe('Jun 30')
    })
  })

  describe('minimal format', () => {
    it('should format a date within this minute correctly in minimal mode', () => {
      const date = new Date()
      expect(toRelativeDate(date, 'en', true)).toBe('now')
      expect(toRelativeDate(date, 'zh_hant', true)).toBe('剛剛')
      expect(toRelativeDate(date, 'zh_hans', true)).toBe('刚刚')
    })

    it('should format a date within this hour but not this minute correctly in minimal mode', () => {
      expect(toRelativeDate(new Date(2023, 6, 1, 8, 28), 'en', true)).toBe('2m')
      expect(toRelativeDate(new Date(2023, 6, 1, 8, 28), 'zh_hant', true)).toBe(
        '2m'
      )
      expect(toRelativeDate(new Date(2023, 6, 1, 8, 28), 'zh_hans', true)).toBe(
        '2m'
      )
    })

    it('should format a date within today but not this hour correctly in minimal mode', () => {
      expect(toRelativeDate(new Date(2023, 6, 1, 7, 30, 0), 'en', true)).toBe(
        '1h'
      )
      expect(toRelativeDate(new Date(2023, 6, 1, 6, 20, 0), 'en', true)).toBe(
        '2h'
      )
      expect(
        toRelativeDate(new Date(2023, 6, 1, 7, 30, 0), 'zh_hant', true)
      ).toBe('1h')
      expect(
        toRelativeDate(new Date(2023, 6, 1, 6, 20, 0), 'zh_hans', true)
      ).toBe('2h')
    })

    it('should format a date less than 24 hours ago in minimal mode', () => {
      expect(toRelativeDate(new Date(2023, 6, 0, 20, 30, 0), 'en', true)).toBe(
        '12h'
      )
    })

    it('should format a date exactly 24 hours ago correctly in minimal mode', () => {
      const date = new Date(2023, 5, 30, 8, 30, 0)
      expect(toRelativeDate(date, 'en', true)).toBe('06-30')
      expect(toRelativeDate(date, 'zh_hant', true)).toBe('06-30')
      expect(toRelativeDate(date, 'zh_hans', true)).toBe('06-30')
    })

    it('should format a date from this year correctly in minimal mode', () => {
      const date = new Date(2023, 1, 15) // 2023-02-15
      expect(toRelativeDate(date, 'en', true)).toBe('02-15')
    })

    it('should format a date from previous year in minimal mode', () => {
      const date = new Date(2022, 5, 15) // 2022-06-15
      expect(toRelativeDate(date, 'en', true)).toBe('2022-06-15')
    })
  })
})
