import gql from 'graphql-tag'

import { ArticleDigest } from '~/components/ArticleDigest'

export default gql`
  query TagDetailArticles($id: ID!, $after: String) {
    node(input: { id: $id }) {
      ... on Tag {
        id
        articles(input: { first: 10, after: $after }) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              ...FeedDigestArticle
            }
          }
        }
      }
    }
  }
  ${ArticleDigest.Feed.fragments.article}
`
