import gql from 'graphql-tag'

import { ArticleDigestSidebar } from '~/components'

export const AUTHOR_SIDEBAR_COLLECTION = gql`
  query AuthorSidebarCollection($id: ID!, $after: String) {
    node(input: { id: $id }) {
      id
      ... on Collection {
        id
        title
        description
        articles(input: { first: 40, after: $after }) {
          totalCount
          pageInfo {
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              ...ArticleDigestSidebarArticle
            }
          }
        }
      }
    }
  }
  ${ArticleDigestSidebar.fragments.article}
`
