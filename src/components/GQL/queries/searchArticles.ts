import gql from 'graphql-tag'

import { DropdownDigest } from '~/components'

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
  ${DropdownDigest.fragments.article}
`
