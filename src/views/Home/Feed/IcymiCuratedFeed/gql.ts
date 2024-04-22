import gql from 'graphql-tag'

import { ArticleDigestCurated } from '~/components'

export const fragments = gql`
  fragment IcymiCuratedFeedRecommendation on Recommendation {
    icymiTopic {
      id
      note
      pinAmount
      articles {
        ...ArticleDigestCuratedArticle
      }
    }
  }
  ${ArticleDigestCurated.fragments.article}
`
