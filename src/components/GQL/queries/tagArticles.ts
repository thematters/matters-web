import gql from 'graphql-tag'

import { ArticleDigestFeed } from '~/components'

export default gql`
  query TagArticles($id: ID!, $after: String, $selected: Boolean) {
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
