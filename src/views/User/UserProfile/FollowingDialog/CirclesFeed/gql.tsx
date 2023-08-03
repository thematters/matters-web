import gql from 'graphql-tag'

import { CircleDigest } from '~/components'

export const USER_FOLLOWING_CIRCLES_PUBLIC = gql`
  query UserFollowingCirclesPublic($userName: String!, $after: String) {
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
        circles(input: { first: 20, after: $after }) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              ...DigestMiniCircle
            }
          }
        }
      }
    }
  }
  ${CircleDigest.Mini.fragments.circle}
`

export const USER_SUBSCRIPTIONS = gql`
  query UserSubscriptions($userName: String!, $after: String) {
    user(input: { userName: $userName }) {
      id
      userName
      displayName
      avatar
      info {
        profileCover
        description
      }
      status {
        state
      }
      subscribedCircles(input: { first: 20, after: $after }) {
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
        edges {
          cursor
          node {
            ...DigestMiniCircle
          }
        }
      }
    }
  }
  ${CircleDigest.Mini.fragments.circle}
`
