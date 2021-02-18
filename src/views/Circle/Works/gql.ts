import gql from 'graphql-tag'

import { ArticleDigestFeed } from '~/components'

export const CIRCLE_WORKS_PUBLIC = gql`
  query CircleWorksPublic($name: String!, $after: String) {
    circle(input: { name: $name }) {
      id
      works(input: { first: 10, after: $after }) {
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
  query CircleWorksPrivate($ids: [ID!]!) {
    nodes(input: { ids: $ids }) {
      id
      ... on Article {
        ...ArticleDigestFeedArticlePrivate
      }
    }
  }
  ${ArticleDigestFeed.fragments.article.private}
`
