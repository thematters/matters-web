import gql from 'graphql-tag'

import { ArticleDigestCurated, ArticleDigestFeed } from '~/components'

export const fragments = gql`
  fragment IcymiCuratedFeedRecommendation on Recommendation {
    icymiTopic {
      id
      note
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
