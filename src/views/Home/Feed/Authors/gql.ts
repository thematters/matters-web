import gql from 'graphql-tag'

import { UserDigest } from '~/components'

export const FEED_AUTHORS = gql`
  query FeedAuthors($random: random_Int_min_0_max_49, $first: first_Int_min_0) {
    viewer @connection(key: "viewerFeedAuthors") {
      id
      recommendation {
        authors(
          input: { first: $first, filter: { random: $random, followed: false } }
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
