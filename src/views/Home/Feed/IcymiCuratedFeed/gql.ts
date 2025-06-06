import gql from 'graphql-tag'

import { ArticleDigestFeed } from '~/components'

import { ArticleDigestCurated } from './ArticleDigestCurated'

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
