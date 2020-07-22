import gql from 'graphql-tag'

import { ArticleDigestFeed } from '~/components'

export const SEARCH_ARTICLES_PUBLIC = gql`
  query SeachArticlesPublic($key: String!, $first: Int!, $after: String) {
    search(input: { key: $key, type: Article, first: $first, after: $after }) {
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          ... on Article {
            ...ArticleDigestFeedArticlePublic
            ...ArticleDigestFeedArticlePrivate
          }
        }
      }
    }
  }
  ${ArticleDigestFeed.fragments.article.public}
  ${ArticleDigestFeed.fragments.article.private}
`

export const SEARCH_ARTICLES_PRIVATE = gql`
  query SeachArticlesPrivate($ids: [ID!]!) {
    nodes(input: { ids: $ids }) {
      id
      ... on Article {
        ...ArticleDigestFeedArticlePrivate
      }
    }
  }
  ${ArticleDigestFeed.fragments.article.private}
`
