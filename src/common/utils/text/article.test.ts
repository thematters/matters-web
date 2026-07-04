import { describe, expect, it } from 'vitest'

import {
  addUserGeneratedContentLinkRel,
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
        '<p>Hello, <a class="mention" href="/@world" data-id="VXNlcjo0NDk1" data-user-name="world" data-display-name="world+16我" rel="noopener noreferrer ugc nofollow"><span>@world+16我</span></a>好</p>',
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
  const CHINESE_ONLY =
    '这是一个标题这是一个标题这是一个标题这是一个标题这是一个'
  const CHINESE_WITH_NUMBERS_AND_PUNCTUATION =
    '看起來 10 拍，快樂喜歡如其實也是我於有我的部分'
  const ENGLISH_ONLY =
    'Lorem gustaría dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  const ENGLISH_WITH_NUMBERS_AND_PUNCTUATION =
    'Lorem gustaría 10 dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  const MIXED =
    '看起來 10 拍，consectetur Lorem gustaría dolor sit amet, adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  const MENTIONS =
    '看起來 10 拍 <a href="/@user">@用戶</a> @user @user+1 Lorem gustaría dolor，快樂喜歡如其實也是我於有我的部分'
  const MUTIPLE_SPACES = '看起來 10     拍快樂喜歡如其實也是我於有我的部分'

  it('should return the title for the default length of 10 words', () => {
    const maxUnits = 10

    expect(makeSummary(CHINESE_ONLY, maxUnits)).toEqual('这是一个标题这是一个…')
    expect(makeSummary(CHINESE_WITH_NUMBERS_AND_PUNCTUATION, maxUnits)).toEqual(
      '看起來 10 拍，快樂喜歡如…'
    )
    expect(makeSummary(ENGLISH_ONLY, maxUnits)).toEqual(
      'Lorem gustaría dolor sit amet, consectetur adipiscing elit, sed do…'
    )
    expect(makeSummary(ENGLISH_WITH_NUMBERS_AND_PUNCTUATION, maxUnits)).toEqual(
      'Lorem gustaría 10 dolor sit amet, consectetur adipiscing elit, sed…'
    )
    expect(makeSummary(MIXED, maxUnits)).toEqual(
      '看起來 10 拍，consectetur Lorem gustaría dolor sit…'
    )
    expect(makeSummary(MENTIONS, maxUnits)).toEqual(
      '看起來 10 拍 @用戶 @user @user+1 Lorem gustaría…'
    )
    expect(makeSummary(MUTIPLE_SPACES, maxUnits)).toEqual(
      '看起來 10 拍快樂喜歡如…'
    )
  })

  it('should truncate the title to the specified maximum number of words', () => {
    const maxLength = 6

    expect(makeSummary(CHINESE_ONLY, maxLength)).toEqual('这是一个标题…')
    expect(makeSummary(CHINESE_ONLY.slice(0, maxLength), maxLength)).toEqual(
      '这是一个标题'
    )
    expect(
      makeSummary(CHINESE_WITH_NUMBERS_AND_PUNCTUATION, maxLength)
    ).toEqual('看起來 10 拍，快…')
    expect(makeSummary(ENGLISH_ONLY, maxLength)).toEqual(
      'Lorem gustaría dolor sit amet, consectetur…'
    )
    expect(
      makeSummary(ENGLISH_WITH_NUMBERS_AND_PUNCTUATION, maxLength)
    ).toEqual('Lorem gustaría 10 dolor sit amet…')
    expect(makeSummary(MIXED, maxLength)).toEqual('看起來 10 拍，consectetur…')
    expect(makeSummary(MENTIONS, maxLength)).toEqual('看起來 10 拍 @用戶…')
  })

  it('should preserve leading quotation marks like 「', () => {
    const titleWithQuotation =
      '「重構生活」七日書完結｜大滿貫、參加獎名單｜11 月 18 日晚上作家周慧講座'
    const maxUnits = 20

    const result = makeSummary(titleWithQuotation, maxUnits)
    expect(result).toContain('「')
    expect(result.startsWith('「')).toBe(true)
  })

  it('should trim trailing punctuation but preserve leading punctuation', () => {
    const textWithTrailingPunctuation =
      'Hello, world. This is a longer text that will be truncated.'
    const result1 = makeSummary(textWithTrailingPunctuation, 2)
    expect(result1).not.toMatch(/\.…$/)
    expect(result1).toMatch(/…$/)

    const textWithLeadingPunctuation = '「重構生活」七日書完結'
    const result2 = makeSummary(textWithLeadingPunctuation, 5)
    expect(result2.startsWith('「')).toBe(true)
  })

  it('should return the title as is if it has fewer words than the maximum', () => {
    const maxLength = 100

    expect(makeSummary(CHINESE_ONLY, maxLength)).toEqual(CHINESE_ONLY)
    expect(
      makeSummary(CHINESE_WITH_NUMBERS_AND_PUNCTUATION, maxLength)
    ).toEqual(CHINESE_WITH_NUMBERS_AND_PUNCTUATION)
    expect(makeSummary(ENGLISH_ONLY, maxLength)).toEqual(ENGLISH_ONLY)
    expect(
      makeSummary(ENGLISH_WITH_NUMBERS_AND_PUNCTUATION, maxLength)
    ).toEqual(ENGLISH_WITH_NUMBERS_AND_PUNCTUATION)
    expect(makeSummary(MIXED, maxLength)).toEqual(MIXED)
    expect(makeSummary(MENTIONS, maxLength)).toEqual(stripHtml(MENTIONS))
    expect(
      makeSummary('Sen no Kiseki II OST - Awakening Will', maxLength)
    ).toEqual('Sen no Kiseki II OST - Awakening Will')
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
  it('should add ugc nofollow rel tokens to user generated links', () => {
    expect(
      addUserGeneratedContentLinkRel(
        '<p><a href="https://example.com">example</a></p>'
      )
    ).toBe(
      '<p><a href="https://example.com" rel="noopener noreferrer ugc nofollow">example</a></p>'
    )

    expect(
      addUserGeneratedContentLinkRel(
        '<p><a href="https://example.com" rel="noopener noreferrer">example</a></p>'
      )
    ).toBe(
      '<p><a href="https://example.com" rel="noopener noreferrer ugc nofollow">example</a></p>'
    )

    expect(
      addUserGeneratedContentLinkRel(
        "<p><a href='https://example.com' rel='sponsored'>example</a></p>"
      )
    ).toBe(
      "<p><a href='https://example.com' rel='noopener noreferrer ugc nofollow sponsored'>example</a></p>"
    )
  })

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
