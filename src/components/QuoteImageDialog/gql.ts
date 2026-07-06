import gql from 'graphql-tag'

import { QuoteImageArticleFragment } from '~/gql/graphql'

/**
 * 金句卡片需要的文章欄位。
 * campaigns 用來判斷文章是否屬於「七日書」活動（WritingChallenge）。
 */
export const fragments = {
  article: gql`
    fragment QuoteImageArticle on Article {
      id
      title
      shortHash
      # 版權 gate：「作者保留所有權利」(ARR) 時僅作者本人可生成金句卡片
      license
      author {
        id
        displayName
        userName
      }
      campaigns {
        campaign {
          id
          shortHash
          ... on WritingChallenge {
            id
            # 是否開放金句牆（後端 per-campaign 旗標，控管「上牆」）
            enableQuoteWall
            nameZhHant: name(input: { language: zh_hant })
            nameZhHans: name(input: { language: zh_hans })
            nameEn: name(input: { language: en })
          }
        }
      }
    }
  `,
}

/**
 * 判斷文章是否屬於「七日書」活動。
 *
 * 目前以活動名稱包含「七日書」為準（涵蓋歷屆七日書）。
 * TODO: 若需更精確，可改為比對一份設定好的七日書 campaign shortHash 清單
 *       （例如放在 src/common/enums 或環境變數），避免名稱被更動時誤判。
 */
export const isSevenDayBookArticle = (
  article?: QuoteImageArticleFragment | null
): boolean => {
  if (!article?.campaigns?.length) return false
  return article.campaigns.some(({ campaign }) => {
    if (campaign?.__typename !== 'WritingChallenge') return false
    const names = [campaign.nameZhHant, campaign.nameZhHans]
    return names.some((n) => !!n && n.includes('七日書'))
  })
}

/**
 * 判斷文章能否「上牆」：所屬活動需開啟金句牆（後端 `enableQuoteWall` 旗標）。
 * 取代舊的「任何活動文章皆可上牆」，改由 per-campaign 旗標控管（資料驅動）。
 */
export const canPostQuoteToWall = (
  article?: QuoteImageArticleFragment | null
): boolean => {
  if (!article?.campaigns?.length) return false
  return article.campaigns.some(
    ({ campaign }) =>
      campaign?.__typename === 'WritingChallenge' && !!campaign.enableQuoteWall
  )
}

/** 上牆成功後導回活動頁所需的最小活動資料 */
export type QuoteWallCampaign = {
  id: string
  shortHash: string
  nameZhHant?: string | null
  nameZhHans?: string | null
  nameEn?: string | null
}

/**
 * 取得文章「上牆」的那個活動（第一個開啟金句牆的 WritingChallenge），
 * 供上牆成功後的成功頁顯示活動名稱並導回活動頁。
 */
export const getQuoteWallCampaign = (
  article?: QuoteImageArticleFragment | null
): QuoteWallCampaign | null => {
  const match = article?.campaigns?.find(
    ({ campaign }) =>
      campaign?.__typename === 'WritingChallenge' && !!campaign.enableQuoteWall
  )
  const campaign = match?.campaign
  if (!campaign || campaign.__typename !== 'WritingChallenge') {
    return null
  }
  return {
    id: campaign.id,
    shortHash: campaign.shortHash,
    nameZhHant: campaign.nameZhHant,
    nameZhHans: campaign.nameZhHans,
    nameEn: campaign.nameEn,
  }
}

/**
 * 上牆失敗的原因分類。server 端這些情況都回同一個 BAD_USER_INPUT，
 * 只能靠訊息內容區分，好對應到具體的友善提示。
 */
export type PostToWallErrorKind = 'duplicate' | 'excerpt' | 'noWall' | 'generic'

export const classifyPostToWallError = (
  message?: string | null
): PostToWallErrorKind => {
  const m = message || ''
  if (/already on the wall/i.test(m)) {
    return 'duplicate'
  }
  if (/excerpt/i.test(m)) {
    return 'excerpt'
  }
  if (/quote wall|campaign article/i.test(m)) {
    return 'noWall'
  }
  return 'generic'
}
