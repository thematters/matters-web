import { describe, expect, it } from 'vitest'

import { abbr } from './abbr'

describe('utils/number/abbr', () => {
  it('should abbreviate thousands correctly', () => {
    expect(abbr(1500, 2)).toBe('1.5k')
    expect(abbr(1550, 2)).toBe('1.55k')
    expect(abbr(1000, 2)).toBe('1k')
    expect(abbr(1001, 2)).toBe('1k')
    expect(abbr(1001.5, 2)).toBe('1k')
  })

  it('should abbreviate millions correctly', () => {
    expect(abbr(1500000, 2)).toBe('1.5m')
    expect(abbr(1554000, 2)).toBe('1.55m')
    expect(abbr(1555000, 2)).toBe('1.56m')
    expect(abbr(1000000, 2)).toBe('1m')
    expect(abbr(1001400, 2)).toBe('1m')
    expect(abbr(1001321.5, 2)).toBe('1m')
  })

  it('should abbreviate billions correctly', () => {
    expect(abbr(1500000000, 2)).toBe('1.5b')
    expect(abbr(1550000000, 2)).toBe('1.55b')
    expect(abbr(1000000000, 2)).toBe('1b')
    expect(abbr(1001000000, 2)).toBe('1b')
    expect(abbr(1001000000.5, 2)).toBe('1b')
  })

  it('should abbreviate trillions correctly', () => {
    expect(abbr(1500000000000, 2)).toBe('1.5t')
    expect(abbr(1550000000000, 2)).toBe('1.55t')
    expect(abbr(1000000000000, 2)).toBe('1t')
    expect(abbr(1001000000000, 2)).toBe('1t')
    expect(abbr(1001000000000.5, 2)).toBe('1t')
  })

  it('should abbreviate negative numbers correctly', () => {
    expect(abbr(-1500, 2)).toBe('-1.5k')
    expect(abbr(-1550, 2)).toBe('-1.55k')
    expect(abbr(-1000, 2)).toBe('-1k')
    expect(abbr(-1001, 2)).toBe('-1k')
    expect(abbr(-1001.5, 2)).toBe('-1k')
  })

  it('should abbreviate numbers with no decimal places correctly', () => {
    expect(abbr(1500, 0)).toBe('2k')
    expect(abbr(1540, 0)).toBe('2k')
    expect(abbr(1550, 0)).toBe('2k')
    expect(abbr(1000, 0)).toBe('1k')
    expect(abbr(1001, 0)).toBe('1k')
    expect(abbr(1001.5, 0)).toBe('1k')
  })

  it('should abbreviate numbers with 3 decimal place correctly', () => {
    expect(abbr(1500, 3)).toBe('1.5k')
    expect(abbr(1540, 3)).toBe('1.54k')
    expect(abbr(1550, 3)).toBe('1.55k')
    expect(abbr(1000, 3)).toBe('1k')
    expect(abbr(1001, 3)).toBe('1.001k')
    expect(abbr(1001.5, 3)).toBe('1.002k')
  })
})
