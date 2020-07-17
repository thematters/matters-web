import gql from 'graphql-tag'

import { ArticleDigestFeed } from '~/components'

export const TAG_ARTICLES_PUBLIC = gql`
  query TagArticlesPublic($id: ID!, $after: String, $selected: Boolean) {
    node(input: { id: $id }) {
      ... on Tag {
        id
        articles(input: { first: 10, after: $after, selected: $selected }) {
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
  }
  ${ArticleDigestFeed.fragments.article.public}
  ${ArticleDigestFeed.fragments.article.private}
`

export const TAG_ARTICLES_PRIVATE = gql`
  query TagArticlesPrivate($ids: [ID!]!) {
    nodes(input: { ids: $ids }) {
      id
      ... on Article {
        ...ArticleDigestFeedArticlePrivate
      }
    }
  }
  ${ArticleDigestFeed.fragments.article.private}
`
