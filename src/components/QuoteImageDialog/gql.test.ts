import { describe, expect, it } from 'vitest'

import { QuoteImageArticleFragment } from '~/gql/graphql'

import {
  canPostQuoteToWall,
  classifyPostToWallError,
  getQuoteWallCampaign,
  isSevenDayBookArticle,
} from './gql'

type CampaignInput = {
  id?: string
  shortHash?: string
  enableQuoteWall?: boolean
  nameZhHant?: string
  typename?: 'WritingChallenge' | 'Campaign'
}

// 用最小欄位組出符合 QuoteImageArticleFragment 形狀的文章
const makeArticle = (campaigns: CampaignInput[]): QuoteImageArticleFragment =>
  ({
    campaigns: campaigns.map((c) => ({
      campaign: {
        __typename: c.typename ?? 'WritingChallenge',
        id: c.id ?? 'c1',
        shortHash: c.shortHash ?? 'hash1',
        enableQuoteWall: c.enableQuoteWall ?? false,
        nameZhHant: c.nameZhHant ?? '七日書 · 第 12 期',
        nameZhHans: '七日书',
        nameEn: 'Seven Day Book',
      },
    })),
  }) as unknown as QuoteImageArticleFragment

describe('getQuoteWallCampaign', () => {
  it('returns null when the article has no campaigns', () => {
    expect(getQuoteWallCampaign(makeArticle([]))).toBeNull()
    expect(getQuoteWallCampaign(null)).toBeNull()
  })

  it('returns null when no campaign has the quote wall enabled', () => {
    expect(
      getQuoteWallCampaign(makeArticle([{ enableQuoteWall: false }]))
    ).toBeNull()
  })

  it('returns the enabled writing-challenge campaign with its shortHash and names', () => {
    const campaign = getQuoteWallCampaign(
      makeArticle([
        { shortHash: 'abc123', enableQuoteWall: true, id: 'camp-1' },
      ])
    )
    expect(campaign).toMatchObject({
      id: 'camp-1',
      shortHash: 'abc123',
      nameZhHant: '七日書 · 第 12 期',
      nameEn: 'Seven Day Book',
    })
  })

  it('picks the first campaign that has the wall enabled', () => {
    const campaign = getQuoteWallCampaign(
      makeArticle([
        { shortHash: 'off', enableQuoteWall: false },
        { shortHash: 'on', enableQuoteWall: true },
      ])
    )
    expect(campaign?.shortHash).toBe('on')
  })
})

describe('canPostQuoteToWall', () => {
  it('is true only when a campaign has the wall enabled', () => {
    expect(canPostQuoteToWall(makeArticle([{ enableQuoteWall: true }]))).toBe(
      true
    )
    expect(canPostQuoteToWall(makeArticle([{ enableQuoteWall: false }]))).toBe(
      false
    )
    expect(canPostQuoteToWall(makeArticle([]))).toBe(false)
  })
})

describe('classifyPostToWallError', () => {
  it('maps each server BAD_USER_INPUT message to a specific reason', () => {
    expect(classifyPostToWallError('this quote is already on the wall')).toBe(
      'duplicate'
    )
    expect(
      classifyPostToWallError('quote must be an excerpt of the article')
    ).toBe('excerpt')
    expect(
      classifyPostToWallError('this campaign does not have a quote wall')
    ).toBe('noWall')
    expect(
      classifyPostToWallError('only campaign articles can be quoted onto wall')
    ).toBe('noWall')
  })

  it('falls back to generic for unknown or missing messages', () => {
    expect(classifyPostToWallError('some unexpected error')).toBe('generic')
    expect(classifyPostToWallError('')).toBe('generic')
    expect(classifyPostToWallError(undefined)).toBe('generic')
    expect(classifyPostToWallError(null)).toBe('generic')
  })
})

describe('isSevenDayBookArticle', () => {
  it('detects the seven-day-book campaign by name', () => {
    expect(
      isSevenDayBookArticle(makeArticle([{ nameZhHant: '七日書 · 第 12 期' }]))
    ).toBe(true)
    expect(
      isSevenDayBookArticle(makeArticle([{ nameZhHant: '其他活動' }]))
    ).toBe(false)
  })
})
