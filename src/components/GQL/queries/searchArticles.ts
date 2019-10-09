import gql from 'graphql-tag'

import { ArticleDigest } from '~/components/ArticleDigest'

export default gql`
  query SearchArticles($search: String!) {
    search(input: { key: $search, type: Article, first: 5 }) {
      edges {
        node {
          ... on Article {
            ...DropdownDigestArticle
          }
        }
      }
    }
  }
  ${ArticleDigest.Dropdown.fragments.article}
`
