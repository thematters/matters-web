import { describe, expect, it } from 'vitest'

import { truncateNoticeTitle } from './notice'

const CHINESE_ONLY = '这是一个标题这是一个标题这是一个标题这是一个标题这是一个'
const CHINESE_WITH_NUMBERS_AND_PUNCTUATION =
  '看起來 10 拍，快樂喜歡如其實也是我於有我的部分'
const ENGLISH_ONLY =
  'Lorem gustaría dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
const ENGLISH_WITH_NUMBERS_AND_PUNCTUATION =
  'Lorem gustaría 10 dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
const MIXED =
  '看起來 10 拍，consectetur Lorem gustaría dolor sit amet, adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
const MENTIONS =
  '看起來 10 拍 @用戶 @user @user+1 Lorem gustaría dolor，快樂喜歡如其實也是我於有我的部分'

describe.concurrent('utils/text/collection/truncateNoticeTitle', () => {
  it('should return the title for the default length of 10 words', () => {
    expect(truncateNoticeTitle(CHINESE_ONLY)).toEqual('这是一个标题这是一个...')
    expect(truncateNoticeTitle(CHINESE_WITH_NUMBERS_AND_PUNCTUATION)).toEqual(
      '看起來 10 拍，快樂喜歡如...'
    )
    expect(truncateNoticeTitle(ENGLISH_ONLY)).toEqual(
      'Lorem gustaría dolor sit amet, consectetur adipiscing elit, sed do...'
    )
    expect(truncateNoticeTitle(ENGLISH_WITH_NUMBERS_AND_PUNCTUATION)).toEqual(
      'Lorem gustaría 10 dolor sit amet, consectetur adipiscing elit, sed...'
    )
    expect(truncateNoticeTitle(MIXED)).toEqual(
      '看起來 10 拍，consectetur Lorem gustaría dolor sit...'
    )
    expect(truncateNoticeTitle(MENTIONS)).toEqual(
      '看起來 10 拍 @用戶 @user @user+1 Lorem gustaría...'
    )
  })

  it('should truncate the title to the specified maximum number of words', () => {
    const maxLength = 6

    expect(truncateNoticeTitle(CHINESE_ONLY, maxLength)).toEqual(
      '这是一个标题...'
    )
    expect(
      truncateNoticeTitle(CHINESE_ONLY.slice(0, maxLength), maxLength)
    ).toEqual('这是一个标题')
    expect(
      truncateNoticeTitle(CHINESE_WITH_NUMBERS_AND_PUNCTUATION, maxLength)
    ).toEqual('看起來 10 拍，快...')
    expect(truncateNoticeTitle(ENGLISH_ONLY, maxLength)).toEqual(
      'Lorem gustaría dolor sit amet, consectetur...'
    )
    expect(
      truncateNoticeTitle(ENGLISH_WITH_NUMBERS_AND_PUNCTUATION, maxLength)
    ).toEqual('Lorem gustaría 10 dolor sit amet...')
    expect(truncateNoticeTitle(MIXED, maxLength)).toEqual(
      '看起來 10 拍，consectetur...'
    )
    expect(truncateNoticeTitle(MENTIONS, maxLength)).toEqual(
      '看起來 10 拍 @用戶...'
    )
  })

  it('should return the title as is if it has fewer words than the maximum', () => {
    const maxLength = 100

    expect(truncateNoticeTitle(CHINESE_ONLY, maxLength)).toEqual(CHINESE_ONLY)
    expect(
      truncateNoticeTitle(CHINESE_WITH_NUMBERS_AND_PUNCTUATION, maxLength)
    ).toEqual(CHINESE_WITH_NUMBERS_AND_PUNCTUATION)
    expect(truncateNoticeTitle(ENGLISH_ONLY, maxLength)).toEqual(ENGLISH_ONLY)
    expect(
      truncateNoticeTitle(ENGLISH_WITH_NUMBERS_AND_PUNCTUATION, maxLength)
    ).toEqual(ENGLISH_WITH_NUMBERS_AND_PUNCTUATION)
    expect(truncateNoticeTitle(MIXED, maxLength)).toEqual(MIXED)
    expect(truncateNoticeTitle(MENTIONS, maxLength)).toEqual(MENTIONS)
  })
})
