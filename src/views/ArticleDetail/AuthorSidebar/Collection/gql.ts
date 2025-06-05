import gql from 'graphql-tag'

import { ArticleDigestAuthorSidebar } from '../ArticleDigestAuthorSidebar'

export const AUTHOR_SIDEBAR_COLLECTION = gql`
  query AuthorSidebarCollection(
    $id: ID!
    $before: String
    $after: String
    $includeBefore: Boolean
    $includeAfter: Boolean
  ) {
    node(input: { id: $id }) {
      id
      ... on Collection {
        id
        title
        description
        articles(
          input: {
            last: 20
            before: $before
            first: 20
            after: $after
            includeBefore: $includeBefore
            includeAfter: $includeAfter
          }
        ) {
          totalCount
          pageInfo {
            startCursor
            endCursor
            hasNextPage
            hasPreviousPage
          }
          edges {
            cursor
            node {
              ...ArticleDigestAuthorSidebarArticle
            }
          }
        }
      }
    }
  }
  ${ArticleDigestAuthorSidebar.fragments.article}
`
