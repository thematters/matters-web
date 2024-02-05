import gql from 'graphql-tag'

import Feed from '../Feed'

export const fragments = {
  comment: {
    public: gql`
      fragment ThreadCommentCommentBetaPublic on Comment {
        id
        ...FeedCommentBetaPublic
        comments(input: { sort: oldest, first: 3 }) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              ...FeedCommentBetaPublic
            }
          }
        }
      }
      ${Feed.fragments.comment.public}
    `,
    private: gql`
      fragment ThreadCommentCommentBetaPrivate on Comment {
        id
        ...FeedCommentBetaPrivate
        comments(input: { sort: oldest, first: 3 }) {
          edges {
            cursor
            node {
              ...FeedCommentBetaPrivate
            }
          }
        }
      }
      ${Feed.fragments.comment.private}
    `,
  },
}

export const DESCENDANT_COMMENTS_COMMENT_PUBLIC = gql`
  query DescendantCommentsCommentPublic(
    $id: ID!
    $after: String
    $first: first_Int_min_0 = 3
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
                ...ThreadCommentCommentBetaPublic
                ...ThreadCommentCommentBetaPrivate
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
        ...ThreadCommentCommentBetaPrivate
      }
    }
  }
  ${fragments.comment.private}
`
