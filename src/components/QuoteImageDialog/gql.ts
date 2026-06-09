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
