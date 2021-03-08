import gql from 'graphql-tag'

import { ThreadComment } from '~/components'

import SubscriptionBanner from '../SubscriptionBanner'

export const DISCUSSION_PUBLIC = gql`
  query DiscussionPublic($name: String!) {
    circle(input: { name: $name }) {
      id
      discussionCount
      discussionThreadCount
      ...SubscriptionBannerCirclePublic
      ...SubscriptionBannerCirclePrivate
    }
  }
  ${SubscriptionBanner.fragments.circle.public}
  ${SubscriptionBanner.fragments.circle.private}
`

export const DISCUSSION_PRIVATE = gql`
  query DiscussionPrivate($name: String!) {
    circle(input: { name: $name }) {
      id
      ...SubscriptionBannerCirclePrivate
    }
  }
  ${SubscriptionBanner.fragments.circle.private}
`

export const DISCUSSION_COMMENTS = gql`
  query DiscussionComments($name: String!, $after: String) {
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
    }
  }
  ${ThreadComment.fragments.comment.public}
  ${ThreadComment.fragments.comment.private}
`
