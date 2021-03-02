import gql from 'graphql-tag'

import { ThreadComment } from '~/components'

import SubscriptionBanner from '../SubscriptionBanner'

export const BROADCAST_PUBLIC = gql`
  query BroadcastPublic($name: String!, $after: String) {
    circle(input: { name: $name }) {
      id
      broadcast(input: { first: 10, after: $after }) {
        totalCount
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
        edges {
          node {
            ...ThreadCommentCommentPublic
            ...ThreadCommentCommentPrivate
          }
        }
      }
      ...SubscriptionBannerCirclePublic
      ...SubscriptionBannerCirclePrivate
    }
  }
  ${ThreadComment.fragments.comment.public}
  ${ThreadComment.fragments.comment.private}
  ${SubscriptionBanner.fragments.circle.public}
  ${SubscriptionBanner.fragments.circle.private}
`

export const BROADCAST_PRIVATE = gql`
  query BroadcastPrivate($name: String!, $ids: [ID!]!) {
    circle(input: { name: $name }) {
      id
      ...SubscriptionBannerCirclePrivate
    }
    nodes(input: { ids: $ids }) {
      id
      ... on Comment {
        ...ThreadCommentCommentPrivate
      }
    }
  }
  ${ThreadComment.fragments.comment.private}
  ${SubscriptionBanner.fragments.circle.private}
`
