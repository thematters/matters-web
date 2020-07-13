import gql from 'graphql-tag'

import { UserDigest } from '~/components/UserDigest'

export const USER_FOLLOWERS_PUBLIC = gql`
  query UserFollowerPublic($userName: String!, $after: String) {
    user(input: { userName: $userName }) {
      id
      displayName
      followers(input: { first: 20, after: $after }) {
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

export const USER_FOLLOWERS_PRIVATE = gql`
  query UserFollowerPrivate($ids: [ID!]!) {
    nodes(input: { ids: $ids }) {
      id
      ... on User {
        ...UserDigestRichUserPrivate
      }
    }
  }
  ${UserDigest.Rich.fragments.user.private}
`
