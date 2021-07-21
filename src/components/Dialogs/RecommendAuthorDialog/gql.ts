import gql from 'graphql-tag'

import { UserDigest } from '~/components/UserDigest'

export const RECOMMEND_AUTHORS = gql`
  query RecommendAuthors($random: random_Int_min_0_max_49, $type: AuthorsType) {
    viewer @connection(key: "viewerRecommendAuthors") {
      id
      recommendation {
        authors(
          input: {
            first: 5
            filter: { random: $random, followed: false }
            type: $type
          }
        ) {
          edges {
            cursor
            node {
              ...UserDigestRichUserPublic
              ...UserDigestRichUserPrivate
            }
          }
        }
      }
    }
  }
  ${UserDigest.Rich.fragments.user.public}
  ${UserDigest.Rich.fragments.user.private}
`
