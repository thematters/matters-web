import gql from 'graphql-tag'

import { ThreadComment } from '~/components'

import SubscriptionBanner from '../SubscriptionBanner'

export const DISCUSSION_PUBLIC = gql`
  query DiscussionPublic($name: String!, $after: String) {
    circle(input: { name: $name }) {
      id
      discussion(input: { first: 10, after: $after }) {
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

export const DISCUSSION_PRIVATE = gql`
  query DiscussionPrivate($name: String!, $ids: [ID!]!) {
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
