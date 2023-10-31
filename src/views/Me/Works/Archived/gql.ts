import gql from 'graphql-tag'

import { ArticleDigestTitle } from '~/components/ArticleDigest/Title'

export const ME_WORKS_ARCHIVED_FEED = gql`
  query MeWorksArchivedFeed($after: String) {
    viewer {
      id
      articles(
        input: { first: 20, after: $after, filter: { state: archived } }
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
            createdAt
            ...ArticleDigestTitleArticle
          }
        }
      }
    }
  }
  ${ArticleDigestTitle.fragments.article}
`
