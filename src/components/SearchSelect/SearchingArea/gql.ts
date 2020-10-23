import gql from 'graphql-tag'

import { ArticleDigestDropdown, Tag, UserDigest } from './internal'

export const SELECT_SEARCH = gql`
  query SelectSearch(
    $key: String!
    $type: SearchTypes!
    $filter: SearchFilter
    $after: String
    $first: Int
  ) {
    search(
      input: {
        key: $key
        type: $type
        filter: $filter
        after: $after
        first: $first
      }
    ) {
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          id
          ... on User {
            info {
              description
            }
            ...UserDigestMiniUser
          }
          ... on Article {
            ...ArticleDigestDropdownArticle
          }
          ... on Tag {
            ...DigestTag
          }
        }
      }
    }
  }
  ${UserDigest.Mini.fragments.user}
  ${ArticleDigestDropdown.fragments.article}
  ${Tag.fragments.tag}
`
