import gql from 'graphql-tag'

import { ArticleCommentFeed } from '../Feed'

export const fragments = {
  comment: {
    public: gql`
      fragment ArticleThreadCommentCommentPublic on Comment {
        id
        ...ArticleFeedCommentPublic
        comments(input: { sort: oldest, first: 3 }) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              ...ArticleFeedCommentPublic
            }
          }
        }
      }
      ${ArticleCommentFeed.fragments.comment.public}
    `,
    private: gql`
      fragment ArticleThreadCommentCommentPrivate on Comment {
        id
        ...ArticleFeedCommentPrivate
        comments(input: { sort: oldest, first: 3 }) {
          edges {
            cursor
            node {
              ...ArticleFeedCommentPrivate
            }
          }
        }
      }
      ${ArticleCommentFeed.fragments.comment.private}
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
                ...ArticleThreadCommentCommentPublic
                ...ArticleThreadCommentCommentPrivate
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
        ...ArticleThreadCommentCommentPrivate
      }
    }
  }
  ${fragments.comment.private}
`
