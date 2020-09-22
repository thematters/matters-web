import gql from 'graphql-tag'
import _chunk from 'lodash/chunk'

import { UserDigest } from '~/components'

export const FEED_AUTHORS = gql`
  query FeedAuthors($random: NonNegativeInt) {
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
