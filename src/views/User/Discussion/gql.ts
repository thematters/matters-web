import gql from 'graphql-tag'

import { ThreadComment } from '~/components'

export const DISCUSSION_PUBLIC = gql`
  query UserDiscussionPublic($name: String!) {
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
  query UserDiscussionPrivate($name: String!) {
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
  query UserDiscussionComments($name: String!, $after: String) {
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
