import gql from 'graphql-tag'

import { CommentFeed } from '../Feed'

export const fragments = {
  comment: {
    public: gql`
      fragment CommentThreadCommentCommentPublic on Comment {
        id
        ...CommentFeedCommentPublic
        comments(input: { sort: oldest, first: 3 }) {
          edges {
            cursor
            node {
              ...CommentFeedCommentPublic
            }
          }
        }
      }
      ${CommentFeed.fragments.comment.public}
    `,
    private: gql`
      fragment CommentThreadCommentCommentPrivate on Comment {
        id
        ...CommentFeedCommentPrivate
        comments(input: { sort: oldest, first: 3 }) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              ...CommentFeedCommentPrivate
            }
          }
        }
      }
      ${CommentFeed.fragments.comment.private}
    `,
  },
}

export const DESCENDANT_COMMENTS_COMMENT_PUBLIC = gql`
  query DescendantCommentsCommentPublic(
    $id: ID!
    $after: String
    $first: first_Int_min_0 = 40
  ) {
    comment: node(input: { id: $id }) {
      ... on Comment {
        comments(input: { sort: oldest, after: $after, first: $first }) {
          totalCount
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            node {
              ... on Comment {
                ...CommentThreadCommentCommentPublic
                ...CommentThreadCommentCommentPrivate
              }
            }
          }
        }
      }
    }
  }
  ${fragments.comment.public}
  ${fragments.comment.private}
`
export const DESCENDANT_COMMENTS_COMMENT_PRIVATE = gql`
  query DescendantCommentsCommentPrivate($ids: [ID!]!) {
    nodes(input: { ids: $ids }) {
      id
      ... on Comment {
        ...CommentThreadCommentCommentPrivate
      }
    }
  }
  ${fragments.comment.private}
`
