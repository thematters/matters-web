import gql from 'graphql-tag'

import { ArticleDigest } from '~/components'

export default {
  dropdown: gql`
    fragment DropdownCollection on Article {
      id
      collection(input: { after: $after, first: $first })
        @connection(key: "articleCollection") {
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
        totalCount
        edges {
          cursor
          node {
            ...DropdownDigestArticle
          }
        }
      }
    }
    ${ArticleDigest.Dropdown.fragments.article}
  `,
  sidebar: gql`
    fragment SidebarCollection on Article {
      id
      collection(input: { after: $after, first: $first })
        @connection(key: "articleCollection") {
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
        totalCount
        edges {
          cursor
          node {
            ...SidebarDigestArticle
          }
        }
      }
    }
    ${ArticleDigest.Sidebar.fragments.article}
  `
}
