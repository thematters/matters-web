import gql from 'graphql-tag'

import { ArticleDigest } from '~/components/ArticleDigest'

export default gql`
  query UserArticles(
    $userName: String!
    $after: String
    $hasArticleDigestActionBookmark: Boolean = true
    $hasArticleDigestActionTopicScore: Boolean = false
  ) {
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
            ...FeedDigestArticle
          }
        }
      }
      status {
        articleCount
        totalWordCount
      }
    }
  }
  ${ArticleDigest.Feed.fragments.article}
`
