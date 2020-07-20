import gql from 'graphql-tag'

import { ArticleDigestFeed } from '~/components'

const fragment = gql`
  fragment ArticlesUser on User {
    id
    displayName
    info {
      description
      profileCover
    }
    articles(input: { first: 10, after: $after }) {
      totalCount
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          createdAt
          wordCount
          ...ArticleDigestFeedArticlePublic
          ...ArticleDigestFeedArticlePrivate
        }
      }
    }
    status {
      state
      articleCount
      totalWordCount
    }
  }
  ${ArticleDigestFeed.fragments.article.public}
  ${ArticleDigestFeed.fragments.article.private}
`

// without `Public` suffix, query as a logged-in user
export const VIEWER_ARTICLES = gql`
  query ViewerArticles($userName: String!, $after: String) {
    user(input: { userName: $userName }) @connection(key: "viewerArticles") {
      ...ArticlesUser
    }
  }
  ${fragment}
`

// with `Public` suffix, query as an anonymous user
export const USER_ARTICLES_PUBLIC = gql`
  query UserArticlesPublic($userName: String!, $after: String) {
    user(input: { userName: $userName }) {
      ...ArticlesUser
    }
  }
  ${fragment}
`

export const USER_ARTICLES_PRIVATE = gql`
  query UserArticlesPrivate($ids: [ID!]!) {
    nodes(input: { ids: $ids }) {
      id
      ... on Article {
        ...ArticleDigestFeedArticlePrivate
      }
    }
  }
  ${ArticleDigestFeed.fragments.article.private}
`
