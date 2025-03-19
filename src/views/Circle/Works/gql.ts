import gql from 'graphql-tag'

import { ArticleDigestFeed } from '~/components'

export const CIRCLE_WORKS_PUBLIC = gql`
  query CircleWorksPublic($name: String!, $after: String) {
    circle(input: { name: $name }) {
      id
      articles: works(input: { first: 20, after: $after }) {
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
        edges {
          cursor
          node {
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

export const CIRCLE_WORKS_PRIVATE = gql`
  query CircleWorksPrivate($name: String!, $ids: [ID!]!) {
    circle(input: { name: $name }) {
      id
    }
    nodes(input: { ids: $ids }) {
      id
      ... on Article {
        ...ArticleDigestFeedArticlePrivate
      }
    }
  }
  ${ArticleDigestFeed.fragments.article.private}
`
