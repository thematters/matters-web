import gql from 'graphql-tag'

import { CircleDigest } from '~/components'

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
          node {
            ...DigestMiniCircle
          }
        }
      }
    }
  }
  ${CircleDigest.Mini.fragments.circle}
`
