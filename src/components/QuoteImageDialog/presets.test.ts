import { describe, expect, it } from 'vitest'

import { clampQuote, fitFontSize, MAX_QUOTE_LEN } from './presets'

describe('clampQuote', () => {
  it('trims and collapses whitespace', () => {
    const { text, truncated } = clampQuote('  你好   世界 ')
    expect(text).toBe('你好 世界')
    expect(truncated).toBe(false)
  })

  it('keeps a quote at the length limit intact', () => {
    const raw = '字'.repeat(MAX_QUOTE_LEN)
    const { text, truncated, original } = clampQuote(raw)
    expect(text).toBe(raw)
    expect(truncated).toBe(false)
    expect(original).toBe(MAX_QUOTE_LEN)
  })

  it('truncates an over-length quote and appends an ellipsis', () => {
    const raw = '字'.repeat(MAX_QUOTE_LEN + 20)
    const { text, truncated, original } = clampQuote(raw)
    expect(text).toBe('字'.repeat(MAX_QUOTE_LEN) + '…')
    expect(text.length).toBe(MAX_QUOTE_LEN + 1)
    expect(truncated).toBe(true)
    expect(original).toBe(MAX_QUOTE_LEN + 20)
  })

  it('handles empty input', () => {
    expect(clampQuote('').text).toBe('')
  })
})

describe('fitFontSize', () => {
  it('scales down as the quote gets longer (portrait)', () => {
    expect(fitFontSize(10, true)).toBe(84)
    expect(fitFontSize(30, true)).toBe(74)
    expect(fitFontSize(48, true)).toBe(64)
    expect(fitFontSize(64, true)).toBe(56)
    expect(fitFontSize(80, true)).toBe(50)
  })

  it('uses a smaller scale for the shorter square canvas', () => {
    expect(fitFontSize(10, false)).toBe(78)
    expect(fitFontSize(80, false)).toBe(42)
    // square is never larger than portrait at the same length
    for (let len = 0; len <= MAX_QUOTE_LEN; len++) {
      expect(fitFontSize(len, false)).toBeLessThanOrEqual(
        fitFontSize(len, true)
      )
    }
  })

  it('never increases with length', () => {
    for (const tall of [true, false]) {
      let prev = Infinity
      for (let len = 0; len <= MAX_QUOTE_LEN; len++) {
        const size = fitFontSize(len, tall)
        expect(size).toBeLessThanOrEqual(prev)
        prev = size
      }
    }
  })
})
