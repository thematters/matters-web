import gql from 'graphql-tag'

import { ArticleDigestPublished } from './ArticleDigestPublished'

export const ME_WORKS_PUBLISHED_FEED = gql`
  query MeWorksPublishedFeed($after: String, $sort: UserArticlesSort) {
    viewer {
      id
      articles(
        input: {
          first: 20
          after: $after
          sort: $sort
          filter: { state: active }
        }
      ) {
        totalCount
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
        edges {
          cursor
          node {
            id
            title
            ...ArticleDigestPublishedArticlePublic
            ...ArticleDigestPublishedArticlePrivate
          }
        }
      }
    }
  }
  ${ArticleDigestPublished.fragments.article.public}
  ${ArticleDigestPublished.fragments.article.private}
`
