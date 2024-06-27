import gql from 'graphql-tag'

import { CircleThreadComment } from '~/components'

export const BROADCAST_PUBLIC = gql`
  query BroadcastPublic(
    $name: String!
    $before: String
    $after: String
    $first: first_Int_min_0 = 10
    $includeAfter: Boolean
    $includeBefore: Boolean
  ) {
    circle(input: { name: $name }) {
      id
      owner {
        id
      }
      # use alias to prevent overwriting <CircleProfile>'s
      circleIsMember: isMember @connection(key: "circleBroadcastIsMember")
      broadcast(
        input: {
          after: $after
          before: $before
          first: $first
          includeAfter: $includeAfter
          includeBefore: $includeBefore
        }
      ) {
        totalCount
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
        edges {
          node {
            ...CircleCommentThreadCommentCommentPublic
            ...CircleCommentThreadCommentCommentPrivate
          }
        }
      }
    }
  }
  ${CircleThreadComment.fragments.comment.public}
  ${CircleThreadComment.fragments.comment.private}
`

export const BROADCAST_PRIVATE = gql`
  query BroadcastPrivate($name: String!, $ids: [ID!]!) {
    circle(input: { name: $name }) {
      id
      owner {
        id
      }
      # use alias to prevent overwriting <CircleProfile>'s
      circleIsMember: isMember @connection(key: "circleBroadcastIsMember")
    }
    nodes(input: { ids: $ids }) {
      id
      ... on Comment {
        ...CircleCommentThreadCommentCommentPrivate
      }
    }
  }
  ${CircleThreadComment.fragments.comment.private}
`
