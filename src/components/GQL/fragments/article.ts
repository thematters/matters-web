import gql from 'graphql-tag'

import { ArticleDigest } from '~/components'

export default {
  editorCollection: gql`
    fragment EditorCollection on Article {
      id
      collection(input: { first: null }) @connection(key: "articleCollection") {
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
  articleCollection: gql`
    fragment ArticleCollection on Article {
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
