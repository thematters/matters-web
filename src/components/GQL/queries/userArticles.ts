import gql from 'graphql-tag'

import { ArticleDigestFeed } from '~/components'

export default gql`
  query UserArticles($userName: String!, $after: String) {
    user(input: { userName: $userName }) {
      id
      displayName
      info {
        description
        profileCover
      }
      articles(input: { first: 10, after: $after })
        @connection(key: "userArticles") {
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
            ...ArticleDigestFeedArticle
          }
        }
      }
      status {
        state
        articleCount
        totalWordCount
      }
    }
  }
  ${ArticleDigestFeed.fragments.article}
`
