import gql from 'graphql-tag'

import { ArticleDigestFeed } from '~/components'

import { ArticleDigestCurated } from '../ArticleDigestCurated'

export const fragments = gql`
  fragment IcymiCuratedFeedRecommendation on Recommendation {
    icymiTopic {
      id
      noteEn: note(input: { language: en })
      noteZhHant: note(input: { language: zh_hant })
      noteZhHans: note(input: { language: zh_hans })
      pinAmount
      articles {
        ...ArticleDigestCuratedArticle
        ...ArticleDigestFeedArticlePublic
        ...ArticleDigestFeedArticlePrivate
      }
    }
  }
  ${ArticleDigestCurated.fragments.article}
  ${ArticleDigestFeed.fragments.article.public}
  ${ArticleDigestFeed.fragments.article.private}
`
