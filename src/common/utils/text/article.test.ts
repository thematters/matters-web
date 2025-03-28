import { describe, expect, it } from 'vitest'

import {
  containsFigureTag,
  countChars,
  makeSummary,
  normalizeArticleTitle,
  optimizeEmbed,
  stripHtml,
} from './article'

describe('utils/text/article/stripHtml', () => {
  it('should remove HTML tags', () => {
    expect(stripHtml('')).toBe('')

    expect(stripHtml('<p>Hello, <strong>world</strong>!</p>')).toBe(
      'Hello, world!'
    )

    expect(
      stripHtml(
        '<p>Hello, <a class="mention" href="/@world" data-id="VXNlcjo0NDk1" data-user-name="world" data-display-name="world+16我" rel="noopener noreferrer nofollow"><span>@world+16我</span></a>好</p>',
        {
          ensureMentionTrailingSpace: true,
        }
      )
    ).toBe('Hello, @world+16我 好')

    expect(
      stripHtml(
        '<p>Hello, <strong>world</strong>!</p><p>Hello, <strong>world</strong>!</p><blockquote>Hello, <br>world!</blockquote>'
      )
    ).toBe('Hello, world!\nHello, world!\nHello, \nworld!')
  })

  it('should remove HTML tags and custom replacement', () => {
    expect(
      stripHtml('<p>Hello, <strong>world</strong>!</p>', {
        tagReplacement: ' ',
      })
    ).toBe('Hello,  world !')
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
  const maxUnits = 4

  it('should make summary from HTML content with default max units', () => {
    expect(
      makeSummary(
        '<p>Hello, <strong>world</strong>. This is a very long sentence.</p>'
      )
    ).toBe('Hello, world. This is a very long sentence.')
  })

  it('should handle empty string', () => {
    expect(makeSummary('')).toBe('')
  })

  it('should truncate English text to specified length', () => {
    expect(
      makeSummary(
        '<p>Hello, <strong>world</strong>. This is a very long sentence.</p>',
        maxUnits
      )
    ).toBe('Hello, world. This is…')
  })

  it('should truncate Chinese text to specified length', () => {
    expect(
      makeSummary('<p>你好，世界！</p><p>你好，世界！</p>', maxUnits)
    ).toBe('你好，世界！…')
  })

  it('should truncate mixed English and Chinese text', () => {
    expect(makeSummary('<p>Hello, 你好，世界！</p>', maxUnits)).toBe(
      'Hello, 你好，世…'
    )
  })

  it('should handle multiple spaces or new lines', () => {
    expect(makeSummary('<p>Hello,        你好，世界！</p>', maxUnits)).toBe(
      'Hello, 你好，世…'
    )

    expect(
      makeSummary(
        '<p>Hello, \n\n\n你好，世界！</p><p>Hello, 你好，世界！</p>',
        maxUnits
      )
    ).toBe('Hello, 你好，世…')

    expect(
      makeSummary('<p>Hello<p>, <p>你好</p>，<p>世界！</p>', maxUnits)
    ).toBe('Hello , 你好 ， 世…')
  })

  it('should handle mentions', () => {
    expect(
      makeSummary('<p>Hello, <a href="/@world">@world</a>!</p>', maxUnits)
    ).toBe('Hello, @world!')

    expect(
      makeSummary('<p>Hello, <a href="/@世界">@世界</a>!</p>', maxUnits)
    ).toBe('Hello, @世界!')

    expect(
      makeSummary(
        '<p>Hello, <a href="/@世界">@世界</a>!</p><p>Hello, <a href="/@world">@world</a>!</p>',
        maxUnits
      )
    ).toBe('Hello, @世界! Hello, @world!')

    expect(
      makeSummary(
        '<p>Hello, <a href="/@世界">@世界</a>!</p><p>Hello, <a href="/@world">@world</a>!</p><p>快樂喜歡如其實也是我於有我的部分</p>',
        maxUnits
      )
    ).toBe('Hello, @世界! Hello, @world!…')
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

describe('utils/text/article/containsFigureTag', () => {
  it('should return true if the content contains a figure tag', () => {
    expect(containsFigureTag('<figure></figure>')).toBe(true)
    expect(containsFigureTag('<figure>content</figure>')).toBe(true)
    expect(
      containsFigureTag(
        '<figure class="embe" data-provider="youtube"><div class="iframe-container"><iframe src="https://www.youtube.com" loading="lazy" allowfullscreen frameborder="0"></iframe></div><figcaption></figcaption></figure>'
      )
    ).toBe(true)
  })

  it('should return false if the content does not contain a figure tag', () => {
    expect(containsFigureTag('')).toBe(false)
    expect(containsFigureTag('<p>content</p>')).toBe(false)
    expect(containsFigureTag('<img src="image.jpg">')).toBe(false)
  })
})
