import gql from 'graphql-tag'

import ResponseComment from '../ResponseComment'

export const FEATURED_COMMENTS_PUBLIC = gql`
  query FeaturedCommentsPublic(
    $mediaHash: String
    $after: String
    $first: Int = 10
  ) {
    article(input: { mediaHash: $mediaHash }) {
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
            ...ResponseCommentCommentPublic
          }
        }
      }
    }
  }
  ${ResponseComment.fragments.comment.public}
`

export const FEATURED_COMMENTS_PRIVATE = gql`
  query FeaturedCommentsPrivate($ids: [ID!]!) {
    nodes(input: { ids: $ids }) {
      id
      ... on Comment {
        ...ResponseCommentCommentPrivate
      }
    }
  }
  ${ResponseComment.fragments.comment.private}
`
