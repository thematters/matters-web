import { describe, expect, it } from 'vitest'

import {
  MOCK_ARTILCE,
  MOCK_CIRCLE,
  MOCK_COLLECTION,
  MOCK_COMMENT,
  MOCK_DRAFT,
  MOCK_TAG,
  MOCK_USER,
} from '~/stories/mocks'

import { fromGlobalId } from './globalId'
import { getSearchType, toPath } from './route'

describe('utils/route/toPath', () => {
  describe('page: articleDetail', () => {
    it('should return the correct path', () => {
      const { href } = toPath({ page: 'articleDetail', article: MOCK_ARTILCE })
      // /@matty/1-slug-Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a
      expect(href).toBe(
        `/@${MOCK_ARTILCE.author.userName}/${
          fromGlobalId(MOCK_ARTILCE.id).id
        }-${MOCK_ARTILCE.slug}-${MOCK_ARTILCE.mediaHash}`
      )
    })

    it('should return the correct path when the article id is not a valid global id', () => {
      const { href } = toPath({
        page: 'articleDetail',
        article: {
          ...MOCK_ARTILCE,
          id: 'invalidId',
        },
      })
      // /@matty/slug-Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a
      expect(href).toBe(
        `/@${MOCK_ARTILCE.author.userName}/${MOCK_ARTILCE.slug}-${MOCK_ARTILCE.mediaHash}`
      )
    })

    it('should return the correct path when the article id is not provided', () => {
      const { href } = toPath({
        page: 'articleDetail',
        article: {
          ...MOCK_ARTILCE,
          id: undefined,
        },
      })
      // /@matty/slug-Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a
      expect(href).toBe(
        `/@${MOCK_ARTILCE.author.userName}/${MOCK_ARTILCE.slug}-${MOCK_ARTILCE.mediaHash}`
      )
    })

    it('should return the short hash path when the shortHash is provided', () => {
      const { href } = toPath({
        page: 'articleDetail',
        article: {
          ...MOCK_ARTILCE,
          shortHash: 'r5ade0on7x1g',
        },
      })

      expect(href).toBe(`/a/r5ade0on7x1g`)
    })

    it('should return the correct path with utm paramaters', () => {
      const { href } = toPath({
        page: 'articleDetail',
        article: MOCK_ARTILCE,
        utm_source: 'test-source',
        utm_campaign: 'test-campaign',
      })
      expect(href).toBe(
        `/@${MOCK_ARTILCE.author.userName}/${
          fromGlobalId(MOCK_ARTILCE.id).id
        }-${MOCK_ARTILCE.slug}-${
          MOCK_ARTILCE.mediaHash
        }?utm_source=test-source&utm_campaign=test-campaign`
      )
    })

    it('should return the correct path with custom search', () => {
      const { href } = toPath({
        page: 'articleDetail',
        article: MOCK_ARTILCE,
        search: {
          referral: 'code',
          utm_source: 'test-source',
        },
      })
      expect(href).toBe(
        `/@${MOCK_ARTILCE.author.userName}/${
          fromGlobalId(MOCK_ARTILCE.id).id
        }-${MOCK_ARTILCE.slug}-${
          MOCK_ARTILCE.mediaHash
        }?referral=code&utm_source=test-source`
      )
    })
  })

  describe('page: circleDetail', () => {
    it('should return the correct path', () => {
      const { href } = toPath({ page: 'circleDetail', circle: MOCK_CIRCLE })
      expect(href).toBe(`/~${MOCK_CIRCLE.name}`)
    })
  })

  describe('page: circleDiscussion', () => {
    it('should return the correct path', () => {
      const { href } = toPath({
        page: 'circleDiscussion',
        circle: MOCK_CIRCLE,
      })
      expect(href).toBe(`/~${MOCK_CIRCLE.name}/discussion`)
    })
  })

  describe('page: circleBroadcast', () => {
    it('should return the correct path', () => {
      const { href } = toPath({
        page: 'circleBroadcast',
        circle: MOCK_CIRCLE,
      })
      expect(href).toBe(`/~${MOCK_CIRCLE.name}/broadcast`)
    })
  })

  describe('page: circleSettings', () => {
    it('should return the correct path', () => {
      const { href } = toPath({
        page: 'circleSettings',
        circle: MOCK_CIRCLE,
      })
      expect(href).toBe(`/~${MOCK_CIRCLE.name}/settings`)
    })
  })

  describe('page: circleAnalytics', () => {
    it('should return the correct path', () => {
      const { href } = toPath({
        page: 'circleAnalytics',
        circle: MOCK_CIRCLE,
      })
      expect(href).toBe(`/~${MOCK_CIRCLE.name}/analytics`)
    })
  })

  describe('page: circleEditProfile', () => {
    it('should return the correct path', () => {
      const { href } = toPath({
        page: 'circleEditProfile',
        circle: MOCK_CIRCLE,
      })
      expect(href).toBe(`/~${MOCK_CIRCLE.name}/settings/edit-profile`)
    })
  })

  describe('page: circleManageInvitation', () => {
    it('should return the correct path', () => {
      const { href } = toPath({
        page: 'circleManageInvitation',
        circle: MOCK_CIRCLE,
      })
      expect(href).toBe(`/~${MOCK_CIRCLE.name}/settings/manage-invitation`)
    })
  })

  describe('page: commentDetail', () => {
    it('should return the correct path for article comment', () => {
      // w/0 parent comment
      const { href } = toPath({
        page: 'commentDetail',
        comment: { ...MOCK_COMMENT, parentComment: null },
        article: MOCK_ARTILCE,
      })
      expect(href).toBe(
        `/@${MOCK_ARTILCE.author.userName}/${
          fromGlobalId(MOCK_ARTILCE.id).id
        }-${MOCK_ARTILCE.slug}-${MOCK_ARTILCE.mediaHash}#${MOCK_COMMENT.id}`
      )

      // with parent comment
      const { href: href2 } = toPath({
        page: 'commentDetail',
        comment: MOCK_COMMENT,
        article: MOCK_ARTILCE,
      })
      expect(href2).toBe(
        `/@${MOCK_ARTILCE.author.userName}/${
          fromGlobalId(MOCK_ARTILCE.id).id
        }-${MOCK_ARTILCE.slug}-${MOCK_ARTILCE.mediaHash}#${
          MOCK_COMMENT.parentComment?.id
        }-${MOCK_COMMENT.id}`
      )
    })

    it('should return the correct path for circle comment', () => {
      // circle discussion
      const { href } = toPath({
        page: 'commentDetail',
        comment: {
          ...MOCK_COMMENT,
          type: 'circleDiscussion',
          parentComment: null,
        },
        circle: MOCK_CIRCLE,
      })
      expect(href).toBe(`/~${MOCK_CIRCLE.name}/discussion#${MOCK_COMMENT.id}`)

      // circle broadcast
      const { href: href2 } = toPath({
        page: 'commentDetail',
        comment: {
          ...MOCK_COMMENT,
          type: 'circleBroadcast',
          parentComment: null,
        },
        circle: MOCK_CIRCLE,
      })
      expect(href2).toBe(`/~${MOCK_CIRCLE.name}/broadcast#${MOCK_COMMENT.id}`)
    })
  })

  describe('page: draftDetail', () => {
    it('should return the correct path', () => {
      const { href } = toPath({ page: 'draftDetail', id: MOCK_DRAFT.id })
      expect(href).toBe(`/me/drafts/${MOCK_DRAFT.id}`)
    })
  })

  describe('page: tagDetail', () => {
    it('should return the correct path with slug', () => {
      const { href } = toPath({ page: 'tagDetail', tag: MOCK_TAG })
      expect(href).toBe(
        `/tags/${fromGlobalId(MOCK_TAG.id).id}-${MOCK_TAG.slug}`
      )
    })

    it('should return the correct path w/o slug', () => {
      const { href } = toPath({
        page: 'tagDetail',
        tag: { ...MOCK_TAG, slug: undefined },
      })
      expect(href).toBe(
        `/tags/${fromGlobalId(MOCK_TAG.id).id}-${MOCK_TAG.content}`
      )
    })

    it('should return the correct path w/ feedType', () => {
      const { href } = toPath({
        page: 'tagDetail',
        tag: MOCK_TAG,
        feedType: 'hottest',
      })
      expect(href).toBe(
        `/tags/${fromGlobalId(MOCK_TAG.id).id}-${MOCK_TAG.slug}?type=hottest`
      )
    })
  })

  describe('page: userProfile', () => {
    it('should return the correct path', () => {
      const { href } = toPath({
        page: 'userProfile',
        userName: MOCK_USER.userName,
      })
      expect(href).toBe(`/@${MOCK_USER.userName}`)
    })
  })

  describe('page: userCollections', () => {
    it('should return the correct path', () => {
      const { href } = toPath({
        page: 'userCollections',
        userName: MOCK_USER.userName,
      })
      expect(href).toBe(`/@${MOCK_USER.userName}/collections`)
    })
  })

  describe('page: search', () => {
    it('should return the correct path with type', () => {
      const { href } = toPath({
        page: 'search',
        q: 'test 測試',
        type: 'article',
      })
      expect(href).toBe(`/search?q=test+%E6%B8%AC%E8%A9%A6&type=article`)
    })

    it('should return the correct path w/o type', () => {
      const { href } = toPath({
        page: 'search',
        q: 'test',
      })
      expect(href).toBe(`/search?q=test`)
    })
  })

  describe('page: collectionDetail', () => {
    it('should return the correct path', () => {
      const { href } = toPath({
        page: 'collectionDetail',
        userName: MOCK_USER.userName,
        collection: MOCK_COLLECTION,
      })
      expect(href).toBe(
        `/@${MOCK_USER.userName}/collections/${MOCK_COLLECTION.id}`
      )
    })
  })
})

describe('utils/route/getSearchType', () => {
  it('should return the correct type ', () => {
    const articleResult = getSearchType('article')
    expect(articleResult).toBe('article')

    const userResult = getSearchType('user')
    expect(userResult).toBe('user')

    const tagResult = getSearchType('tag')
    expect(tagResult).toBe('tag')
  })

  it('should return undefined when the value is not a valid type', () => {
    const result = getSearchType('invalidType')
    expect(result).toBeUndefined()
  })
})
