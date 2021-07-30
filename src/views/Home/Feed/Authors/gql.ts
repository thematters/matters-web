import gql from 'graphql-tag'

import { UserDigest } from '~/components'

export const FEED_AUTHORS = gql`
  query FeedAuthors($random: random_Int_min_0_max_49) {
    viewer @connection(key: "viewerFeedAuthors") {
      id
      recommendation {
        authors(
          input: { first: 9, filter: { random: $random, followed: false } }
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
