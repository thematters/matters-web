import { gql } from '@apollo/client'

import { UserDigest } from '~/components'

export const ALL_AUTHORS_PUBLIC = gql`
  query AllAuthorsPublic($after: String) {
    viewer {
      id
      recommendation {
        authors(input: { first: 20, after: $after }) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
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

export const ALL_AUTHORS_PRIVATE = gql`
  query AllAuthorsPrivate($ids: [ID!]!) {
    nodes(input: { ids: $ids }) {
      id
      ... on User {
        ...UserDigestRichUserPrivate
      }
    }
  }
  ${UserDigest.Rich.fragments.user.private}
`
