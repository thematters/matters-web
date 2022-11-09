import gql from 'graphql-tag'

import { ThreadComment } from '~/components'

export const FEATURED_COMMENTS_PUBLIC = gql`
  query FeaturedCommentsPublic(
    $id: ID!
    $after: String
    $first: first_Int_min_0 = 10
  ) {
    article: node(input: { id: $id }) {
      ... on Article {
        id
        mediaHash
        featuredComments(input: { first: $first, after: $after }) {
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
  }
  ${ThreadComment.fragments.comment.public}
  ${ThreadComment.fragments.comment.private}
`

export const FEATURED_COMMENTS_PRIVATE = gql`
  query FeaturedCommentsPrivate($ids: [ID!]!) {
    nodes(input: { ids: $ids }) {
      id
      ... on Comment {
        ...ThreadCommentCommentPrivate
      }
    }
  }
  ${ThreadComment.fragments.comment.private}
`
