import gql from 'graphql-tag'

import { UserDigest } from '~/components'

export const USER_FOLLOWING_USERS_PUBLIC = gql`
  query UserFollowingUsersPublic($userName: String!, $after: String) {
    user(input: { userName: $userName }) {
      id
      info {
        profileCover
        description
      }
      status {
        state
      }
      following {
        users(input: { first: 20, after: $after }) {
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

export const USER_FOLLOWING_USERS_PRIVATE = gql`
  query UserFollowingUsersPrivate($ids: [ID!]!) {
    nodes(input: { ids: $ids }) {
      id
      ... on User {
        ...UserDigestRichUserPrivate
      }
    }
  }
  ${UserDigest.Rich.fragments.user.private}
`
