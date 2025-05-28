import gql from 'graphql-tag'

import { UserDigest } from '~/components'

export const AUTHORS_RECOMMENDATION_PUBLIC = gql`
  query AuthorsRecommendationPublic(
    $random: random_Int_min_0_max_49
    $first: first_Int_min_0
    $shortHash: String
  ) {
    viewer {
      id
      recommendation {
        authors(
          input: {
            first: $first
            filter: {
              random: $random
              followed: false
              channel: { shortHash: $shortHash }
            }
            newAlgo: true
          }
        ) {
          edges {
            cursor
            node {
              ...UserDigestRichUserPublic
              ...UserDigestRichUserPrivate
            }
          }
          totalCount
        }
      }
    }
  }
  ${UserDigest.Rich.fragments.user.public}
  ${UserDigest.Rich.fragments.user.private}
`
