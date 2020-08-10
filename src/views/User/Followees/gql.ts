import gql from 'graphql-tag'

import { UserDigest } from '~/components/UserDigest'

export const USER_FOLLOWEES_PUBLIC = gql`
  query UserFolloweePublic($userName: String!, $after: String) {
    user(input: { userName: $userName }) {
      id
      displayName
      info {
        description
        profileCover
      }
      followees(input: { first: 20, after: $after }) {
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
  ${UserDigest.Rich.fragments.user.public}
  ${UserDigest.Rich.fragments.user.private}
`

export const USER_FOLLOWEES_PRIVATE = gql`
  query UserFolloweePrivate($ids: [ID!]!) {
    nodes(input: { ids: $ids }) {
      id
      ... on User {
        ...UserDigestRichUserPrivate
      }
    }
  }
  ${UserDigest.Rich.fragments.user.private}
`
