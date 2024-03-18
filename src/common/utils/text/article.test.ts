import { describe, expect, it } from 'vitest'

import {
  collapseContent,
  countChars,
  makeSummary,
  measureDiffs,
  normalizeArticleTitle,
  optimizeEmbed,
  stripHtml,
} from './article'

describe('utils/text/article/stripHtml', () => {
  it('should remove HTML tags and replace with spaces', () => {
    expect(stripHtml('<p>Hello, <strong>world</strong>!</p>')).toBe(
      ' Hello,  world ! '
    )
    expect(stripHtml('')).toBe('')
  })

  it('should remove HTML tags and replace with custom string', () => {
    expect(stripHtml('<p>Hello, <strong>world</strong>!</p>', '-')).toBe(
      '-Hello, -world-!-'
    )
    expect(stripHtml('<p>Hello, <strong>world</strong>!</p>', '')).toBe(
      'Hello, world!'
    )
  })
})

describe('utils/text/article/collapseContent', () => {
  it('should collapse content correctly', () => {
    expect(collapseContent('<p>Hello, \n<strong>world</strong>!</p>')).toBe(
      'Hello,world!'
    )
    expect(collapseContent('')).toBe('')
  })
})

describe('utils/text/article/countChars', () => {
  it('should count characters correctly', () => {
    // ASCII
    expect(countChars('Hello, world!')).toBe(13)

    // Empty
    expect(countChars('')).toBe(0)

    // CJK
    expect(countChars('你好，世界！')).toBe(12)

    // Emoji
    expect(countChars('👋🌍')).toBe(8)

    // Mixed
    expect(countChars('Hello, 你好，👋🌍!')).toBe(22)
  })
})

describe('utils/text/article/makeSummary', () => {
  it('should make summary correctly', () => {
    expect(
      makeSummary(
        '<p>Hello, <strong>world</strong>. This is a very long sentence.</p>'
      )
    ).toBe('Hello, world. This is a very long sentence.')
    expect(makeSummary('')).toBe('')
  })

  it('should make summary correctly with custom lenth', () => {
    expect(
      makeSummary(
        '<p>Hello, <strong>world</strong>. This is a very long sentence.</p>',
        20,
        0
      )
    ).toBe('Hello, world. This i…')
  })

  it('should make summary correctly with custom buffer', () => {
    expect(
      makeSummary(
        '<p>Hello, <strong>world</strong>. This is a very long sentence.</p>',
        20,
        0
      )
    ).toBe('Hello, world. This i…')

    expect(
      makeSummary(
        '<p>Hello, <strong>world</strong>. This is a very long sentence.</p>',
        5,
        3
      )
    ).toBe('Hello…')
  })
})

describe('utils/text/article/measureDiffs', () => {
  it('should measure diffs correctly', () => {
    // no diff
    expect(measureDiffs('Hello, world!', 'Hello, world!')).toBe(0)

    // suffix
    expect(measureDiffs('Hello, world!', 'Hello, world?')).toBe(1)
    expect(measureDiffs('Hello, world!', 'Hello, world')).toBe(1)
    expect(measureDiffs('Hello, world!', 'Hello, world!!!')).toBe(2)

    // prefix
    expect(measureDiffs('Hello, world!', '.Hello, world!')).toBe(1)
    expect(measureDiffs('Hello, world!', 'ello, world!')).toBe(1)
    expect(measureDiffs('Hello, world!', 'Aello, world!')).toBe(1)

    // middle
    expect(measureDiffs('Hello, world!', 'Hello,world!')).toBe(1)
    expect(measureDiffs('Hello, world!', 'Hello, sorld!')).toBe(1)
  })
})

describe('utils/text/article/normalizeArticleTitle', () => {
  it('should normalize article title correctly', () => {
    expect(normalizeArticleTitle('Hello, world!', 1)).toBe('…')
    expect(normalizeArticleTitle('Hello, world!', 10)).toBe('Hello,…')
    expect(normalizeArticleTitle('Hello, world!', 70)).toBe('Hello, world!')
    expect(
      normalizeArticleTitle(
        '你好，世界！你好，世界！你好，世界！你好，世界！你好，世界！你好，世界！你好，世界！',
        70
      )
    ).toBe(
      '你好，世界！你好，世界！你好，世界！你好，世界！你好，世界！你好，…'
    )
  })
})

describe('utils/text/article/optimizeEmbed', () => {
  it('should add loading="lazy" to iframe tags', () => {
    const input = '<iframe src="https://example.com"></iframe>'
    const expected =
      '<iframe loading="lazy" src="https://example.com"></iframe>'
    expect(optimizeEmbed(input)).toBe(expected)
  })

  it('should wrap img tags in a picture tag with a source and img child', () => {
    const input = '<img src="https://example.com/image.jpg">'
    const expected = `
      <picture>
        <source
          srcSet=https://example.com/image.jpg
          onerror="this.srcset='https://example.com/image.jpg'"
        />

        <img
          src=https://example.com/image.jpg
          srcSet=https://example.com/image.jpg
          loading="lazy"
        />
      </picture>
      `
    expect(optimizeEmbed(input).trim()).toBe(expected.trim())
  })
})
