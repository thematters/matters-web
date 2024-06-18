import gql from 'graphql-tag'

import { CircleThreadComment } from '~/components'

export const DISCUSSION_PUBLIC = gql`
  query DiscussionPublic($name: String!) {
    circle(input: { name: $name }) {
      id
      owner {
        id
        isBlocking
      }
      # use alias to prevent overwriting <CircleProfile>'s
      circleIsMember: isMember @connection(key: "circleDiscussionIsMember")
      discussionCount
      discussionThreadCount
    }
  }
`

export const DISCUSSION_PRIVATE = gql`
  query DiscussionPrivate($name: String!) {
    circle(input: { name: $name }) {
      id
      owner {
        id
        isBlocking
      }
      # use alias to prevent overwriting <CircleProfile>'s
      circleIsMember: isMember @connection(key: "circleDiscussionIsMember")
    }
  }
`

export const DISCUSSION_COMMENTS = gql`
  query DiscussionComments(
    $name: String!
    $before: String
    $after: String
    $first: first_Int_min_0 = 10
    $includeAfter: Boolean
    $includeBefore: Boolean
  ) {
    circle(input: { name: $name }) {
      id
      discussion(
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
