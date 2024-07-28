import { describe, expect, it } from 'vitest'

import { UserLanguage } from '~/gql/graphql'

import { truncateTitle } from './collection'

describe.concurrent('utils/text/collection/truncateTitle', () => {
  describe('for Chinese', () => {
    it('should truncate the title to the specified maximum number of words', () => {
      const title = '这是一个标题这是一个标题这是一个标题'
      const maxLength = 3
      const expected = '这是一...'
      const result = truncateTitle(title, UserLanguage.ZhHans, maxLength)
      // Assert
      expect(result).toEqual(expected)
    })

    it('should return the title as is if it has fewer words than the maximum', () => {
      const title = '这是一个标题'
      const maxLength = 7
      const result = truncateTitle(title, UserLanguage.ZhHans, maxLength)
      // Assert
      expect(result).toEqual(title)
    })

    it('should return the title for the default length of 10 words', () => {
      const title = '这是一个标题这是一个标题这是一个标题'
      const expected = '这是一个标题这是一个...'
      const result = truncateTitle(title, UserLanguage.ZhHans)
      // Assert
      expect(result).toEqual(expected)
    })
  })

  describe('for English', () => {
    it('should return the title as is if it has fewer words than the maximum', () => {
      const title = 'The birds are chirping and the sun is shining'
      const maxLength = 50
      const result = truncateTitle(title, UserLanguage.En, maxLength)
      // Assert
      expect(result).toEqual(title)
    })

    it('should truncate the title to the specified maximum number of words', () => {
      const title = 'The birds are chirping and the sun is shining'
      const maxLength = 27
      const expected = 'The birds are chirping and...'
      const result = truncateTitle(title, UserLanguage.En, maxLength)
      // Assert
      expect(result).toEqual(expected)
    })
  })
})
