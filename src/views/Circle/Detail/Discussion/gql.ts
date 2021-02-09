import gql from 'graphql-tag'

import { CircleDigest, ThreadComment } from '~/components'

export const DISCUSSION_PUBLIC = gql`
  query DiscussionPublic($name: String!, $after: String) {
    circle(input: { name: $name }) {
      id
      owner {
        id
      }
      isMember
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
      ...DigestRichCirclePublic
    }
  }
  ${ThreadComment.fragments.comment.public}
  ${ThreadComment.fragments.comment.private}
  ${CircleDigest.Rich.fragments.circle.public}
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
