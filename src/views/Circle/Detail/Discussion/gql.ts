import gql from 'graphql-tag'

import { ThreadComment } from '~/components'

export const DISCUSSION_PUBLIC = gql`
  query DiscussionPublic($name: String!, $after: String) {
    circle(input: { name: $name }) {
      id
      discussion(input: { after: $after }) {
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

export const DISCUSSION_PRIVATE = gql`
  query DiscussionPrivate($ids: [ID!]!) {
    nodes(input: { ids: $ids }) {
      id
      ... on Comment {
        ...ThreadCommentCommentPrivate
      }
    }
  }
  ${ThreadComment.fragments.comment.private}
`
