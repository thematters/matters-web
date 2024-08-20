import { describe, expect, it } from 'vitest'

import { UserLanguage } from '~/gql/graphql'

import { truncateNoticeTitle } from './notice'

describe.concurrent('utils/text/collection/truncateNoticeTitle', () => {
  describe('for Chinese', () => {
    it('should truncate the title to the specified maximum number of words', () => {
      const title = '这是一个标题这是一个标题这是一个标题'
      const maxLength = 3
      const expected = '这是一...'
      const result = truncateNoticeTitle(title, {
        locale: UserLanguage.ZhHans,
        maxLength,
      })
      // Assert
      expect(result).toEqual(expected)
    })

    it('should return the title as is if it has fewer words than the maximum', () => {
      const title = '这是一个标题'
      const maxLength = 7
      const result = truncateNoticeTitle(title, {
        locale: UserLanguage.ZhHans,
        maxLength,
      })
      // Assert
      expect(result).toEqual(title)
    })

    it('should return the title for the default length of 10 words', () => {
      const title = '这是一个标题这是一个标题这是一个标题'
      const expected = '这是一个标题这是一个...'
      const result = truncateNoticeTitle(title, { locale: UserLanguage.ZhHans })
      // Assert
      expect(result).toEqual(expected)
    })
  })

  describe('for English', () => {
    it('should return the title as is if it has fewer words than the maximum', () => {
      const title = 'The birds are chirping and the sun is shining'
      const maxLength = 50
      const result = truncateNoticeTitle(title, {
        locale: UserLanguage.En,
        maxLength,
      })
      // Assert
      expect(result).toEqual(title)
    })

    it('should truncate the title to the specified maximum number of words', () => {
      const title = 'The birds are chirping and the sun is shining'
      const maxLength = 27
      const expected = 'The birds are chirping and...'
      const result = truncateNoticeTitle(title, {
        locale: UserLanguage.En,
        maxLength,
      })
      // Assert
      expect(result).toEqual(expected)
    })
  })

  describe('for English with tagged users', () => {
    it('should truncate characters to under 10 words for english', () => {
      expect(
        truncateNoticeTitle('This is a very long sentence.', {
          includeAtSign: true,
        })
      ).toBe('This is a...')
      expect(
        truncateNoticeTitle('Hello, world.', { includeAtSign: true })
      ).toBe('Hello,...')
    })

    it('should truncate if over 10 characters with tagged users and remaining length is 0 while having english characters', () => {
      expect(
        truncateNoticeTitle('This is a craaaazy article here! @user1 @user2', {
          includeAtSign: true,
        })
      ).toBe('This is a...@user1 @user2')
    })
  })

  describe('for Chinese with tagged users', () => {
    it('should not truncate if under 10 characters', () => {
      expect(
        truncateNoticeTitle('這篇文章真的很厲害！', {
          locale: UserLanguage.ZhHant,
          maxLength: 10,
          includeAtSign: true,
        })
      ).toBe('這篇文章真的很厲害！')
      expect(
        truncateNoticeTitle('很厲害！', {
          locale: UserLanguage.ZhHant,
          maxLength: 10,
          includeAtSign: true,
        })
      ).toBe('很厲害！')
    })

    it('should truncate if over 10 characters', () => {
      expect(
        truncateNoticeTitle('這篇文章真的很厲害，大家應該都來看一下！', {
          locale: UserLanguage.ZhHant,
          maxLength: 10,
          includeAtSign: true,
        })
      ).toBe('這篇文章真的很厲害，...')
    })

    it('should truncate when the title is over 10 characters and the mentions are at the end', () => {
      expect(
        truncateNoticeTitle(
          '這篇文章真的很厲害，大家應該都來看一下 @user1 @user2',
          { locale: UserLanguage.ZhHant, maxLength: 10, includeAtSign: true }
        )
      ).toBe('這篇文章真的很厲害，...@user1 @user2')
      expect(
        truncateNoticeTitle(
          '這篇文章真的很厲害，大家應該都來看一下！ @user1 @user2',
          { locale: UserLanguage.ZhHant, maxLength: 10, includeAtSign: true }
        )
      ).toBe('這篇文章真的很厲害，...@user1 @user2')
      expect(
        truncateNoticeTitle('這是一個時刻！！！！！！！@jj', {
          locale: UserLanguage.ZhHant,
          maxLength: 10,
          includeAtSign: true,
        })
      ).toBe('這是一個時刻！！！！...@jj')
    })

    it('should truncate if over 10 characters with tagged users in the middle or the beginning', () => {
      expect(
        truncateNoticeTitle('我和 @zhangsan 在台北一起去吃吃吃！', {
          locale: UserLanguage.ZhHans,
          maxLength: 10,
          includeAtSign: true,
        })
      ).toBe('我和 @zhangsan 在台北一起去...')
      expect(
        truncateNoticeTitle('@zhangsan 和我在台北一起去吃吃吃！', {
          locale: UserLanguage.ZhHans,
          maxLength: 10,
          includeAtSign: true,
        })
      ).toBe('@zhangsan 和我在台北一起去吃...')
    })

    it('should truncate characters to when the mention is a bit spread out', () => {
      expect(
        truncateNoticeTitle('我和 @zhangsan 還有 @yp 在台北一起去吃吃吃！', {
          locale: UserLanguage.ZhHans,
          maxLength: 10,
          includeAtSign: true,
        })
      ).toBe('我和 @zhangsan 還有 @yp 在台...')
    })
  })
})
