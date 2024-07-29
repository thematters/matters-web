import { describe, expect, it } from 'vitest'

import { UserLanguage } from '~/gql/graphql'

import { truncateMomentTitle } from './moment'

describe('utils/text/moment/truncateMomentTitle', () => {
  it('should not truncate if under 10 characters', () => {
    expect(
      truncateMomentTitle('這篇文章真的很厲害！', 10, UserLanguage.ZhHans)
    ).toBe('這篇文章真的很厲害！')
    expect(truncateMomentTitle('很厲害！', 10, UserLanguage.ZhHant)).toBe(
      '很厲害！'
    )
  })

  it('should truncate if over 10 characters', () => {
    expect(
      truncateMomentTitle(
        '這篇文章真的很厲害，大家應該都來看一下！',
        10,
        UserLanguage.ZhHant
      )
    ).toBe('這篇文章真的很厲害，...')
  })

  it('should truncate when the title is over 10 characters and the mentions are at the end', () => {
    expect(
      truncateMomentTitle(
        '這篇文章真的很厲害，大家應該都來看一下 @user1 @user2',
        10,
        UserLanguage.ZhHant
      )
    ).toBe('這篇文章真的很厲害，...@user1 @user2')
    expect(
      truncateMomentTitle(
        '這篇文章真的很厲害，大家應該都來看一下！ @user1 @user2',
        10,
        UserLanguage.ZhHant
      )
    ).toBe('這篇文章真的很厲害，...@user1 @user2')
    expect(
      truncateMomentTitle(
        '這是一個時刻！！！！！！！@jj',
        10,
        UserLanguage.ZhHant
      )
    ).toBe('這是一個時刻！！！！...@jj')
  })

  it('should truncate if over 10 characters with tagged users in the middle or the beginning', () => {
    expect(
      truncateMomentTitle(
        '我和 @zhangsan 在台北一起去吃吃吃！',
        10,
        UserLanguage.ZhHans
      )
    ).toBe('我和 @zhangsan 在台北一起去...')
    expect(
      truncateMomentTitle(
        '@zhangsan 和我在台北一起去吃吃吃！',
        10,
        UserLanguage.ZhHans
      )
    ).toBe('@zhangsan 和我在台北一起去吃...')
  })

  it('should truncate characters to when the mention is a bit spread out', () => {
    expect(
      truncateMomentTitle(
        '我和 @zhangsan 還有 @yp 在台北一起去吃吃吃！',
        10,
        UserLanguage.ZhHans
      )
    ).toBe('我和 @zhangsan 還有 @yp 在台...')
  })

  it('should truncate characters to under 10 words for english', () => {
    expect(truncateMomentTitle('This is a very long sentence.')).toBe(
      'This is a...'
    )
    expect(truncateMomentTitle('Hello, world.')).toBe('Hello,...')
  })

  it('should truncate if over 10 characters with tagged users and remaining length is 0 while having english characters', () => {
    expect(
      truncateMomentTitle('This is a craaaazy article here! @user1 @user2')
    ).toBe('This is a...@user1 @user2')
  })
})
