import gql from 'graphql-tag'

import { UserDigest } from '~/components'

export const SIDEBAR_AUTHORS_PUBLIC = gql`
  query SidebarAuthorsPublic {
    viewer {
      id
      recommendation {
        authors(
          input: { first: 5, filter: { random: true, followed: false } }
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

export const SIDEBAR_AUTHORS_PRIVATE = gql`
  query SidebarAuthorsPrivate($ids: [ID!]!) {
    nodes(input: { ids: $ids }) {
      id
      ... on User {
        ...UserDigestRichUserPrivate
      }
    }
  }
  ${UserDigest.Rich.fragments.user.private}
`
