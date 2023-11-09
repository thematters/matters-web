import gql from 'graphql-tag'

import { ArticleDigestTitle, UserDigest } from '~/components'

export const ME_COMMENTS = gql`
  query MeComments($id: ID!, $after: String) {
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
              author {
                ...UserDigestMiniUser
              }
              ...ArticleDigestTitleArticle
              comments(input: { filter: { author: $id }, first: null }) {
                edges {
                  cursor
                  node {
                    id
                    content
                    state
                    type
                    parentComment {
                      id
                    }
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
  ${UserDigest.Mini.fragments.user}
`
