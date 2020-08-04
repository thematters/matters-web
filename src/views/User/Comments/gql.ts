import gql from 'graphql-tag'

import { ArticleDigestTitle, Comment } from '~/components'

export const USER_ID = gql`
  query UserIdUser($userName: String!) {
    user(input: { userName: $userName }) {
      id
      displayName
      info {
        description
        profileCover
      }
      status {
        state
      }
    }
  }
`

export const USER_COMMENTS_PUBLIC = gql`
  query UserCommentsPublic($id: ID!, $after: String) {
    node(input: { id: $id }) {
      ... on User {
        id
        commentedArticles(input: { first: 5, after: $after }) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              id
              ...ArticleDigestTitleArticle
              comments(input: { filter: { author: $id }, first: null }) {
                edges {
                  cursor
                  node {
                    ...FeedCommentPublic
                    ...FeedCommentPrivate
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  ${ArticleDigestTitle.fragments.article}
  ${Comment.Feed.fragments.comment.public}
  ${Comment.Feed.fragments.comment.private}
`

export const USER_COMMENTS_PRIVATE = gql`
  query UserCommentsPrivate($ids: [ID!]!) {
    nodes(input: { ids: $ids }) {
      id
      ... on Comment {
        ...FeedCommentPrivate
      }
    }
  }
  ${Comment.Feed.fragments.comment.private}
`
