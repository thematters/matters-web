import gql from 'graphql-tag'

import { ArticleDigestDropdown } from '~/components'

export default gql`
  query SearchArticles($search: String!, $filter: SearchFilter) {
    search(input: { key: $search, type: Article, first: 5, filter: $filter }) {
      edges {
        node {
          ... on Article {
            ...ArticleDigestDropdownArticle
          }
        }
      }
    }
  }
  ${ArticleDigestDropdown.fragments.article}
`
