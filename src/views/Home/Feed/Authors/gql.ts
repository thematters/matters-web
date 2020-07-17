import gql from 'graphql-tag'
import _chunk from 'lodash/chunk'

import { UserDigest } from '~/components'

export const FEED_AUTHORS_PUBLIC = gql`
  query FeedAuthorsPublic {
    viewer @connection(key: "viewerFeedAuthors") {
      id
      recommendation {
        authors(
          input: { first: 9, filter: { random: true, followed: false } }
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

export const FEED_AUTHORS_PRIVATE = gql`
  query FeedAuthorsPrivate($ids: [ID!]!) {
    nodes(input: { ids: $ids }) {
      id
      ... on User {
        ...UserDigestRichUserPrivate
      }
    }
  }
  ${UserDigest.Rich.fragments.user.private}
`
