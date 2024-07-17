import { describe, expect, it } from 'vitest'

import { UserLanguage } from '~/gql/graphql'

import { truncateTitle } from './moment'

describe('utils/text/moment/truncateTitle', () => {
  it('should not truncate if under 10 characters', () => {
    expect(truncateTitle('這篇文章真的很厲害！', 10, UserLanguage.ZhHans)).toBe(
      '這篇文章真的很厲害！'
    )
    expect(truncateTitle('很厲害！', 10, UserLanguage.ZhHant)).toBe('很厲害！')
  })

  it('should truncate if over 10 characters', () => {
    expect(
      truncateTitle('這篇文章真的很厲害，大家應該都來看一下！', 10, UserLanguage.ZhHant)
    ).toBe('這篇文章真的很厲害，...')
  })

  it('should truncate when the title is over 10 characters and the mentions are at the end', () => {
    expect(
      truncateTitle(
        '這篇文章真的很厲害，大家應該都來看一下 @user1 @user2',
        10,
        UserLanguage.ZhHant
      )
    ).toBe('這篇文章真的很厲害，...@user1 @user2')
    expect(
      truncateTitle(
        '這篇文章真的很厲害，大家應該都來看一下！ @user1 @user2',
        10,
        UserLanguage.ZhHant
      )
    ).toBe('這篇文章真的很厲害，...@user1 @user2')
  })

  it('should truncate if over 10 characters with tagged users in the middle or the beginning', () => {
    expect(
      truncateTitle('我和 @zhangsan 在台北一起去吃吃吃！', 10, UserLanguage.ZhHans)
    ).toBe('我和 @zhangsan 在台北一起去...')
    expect(
      truncateTitle('@zhangsan 和我在台北一起去吃吃吃！', 10, UserLanguage.ZhHans)
    ).toBe('@zhangsan 和我在台北一起去吃...')
  })

  it('should truncate characters to when the mention is a bit spread out', () => {
    expect(
      truncateTitle(
        '我和 @zhangsan 還有 @yp 在台北一起去吃吃吃！',
        10,
        UserLanguage.ZhHans
      )
    ).toBe('我和 @zhangsan 還有 @yp 在台...')
  })

  it('should truncate characters to under 10 words for english', () => {
    expect(truncateTitle('This is a very long sentence.')).toBe('This is a...')
    expect(truncateTitle('Hello, world.')).toBe('Hello,...')
  })

  it('should truncate if over 10 characters with tagged users and remaining length is 0 while having english characters', () => {
    expect(
      truncateTitle('This is a craaaazy article here! @user1 @user2')
    ).toBe('This is a...@user1 @user2')
  })
})
