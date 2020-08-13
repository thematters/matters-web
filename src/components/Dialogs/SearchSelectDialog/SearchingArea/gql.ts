import gql from 'graphql-tag'

import { ArticleDigestDropdown, Tag, UserDigest } from '~/components'

export const SELECT_SEARCH = gql`
  query SelectSearch($key: String!, $type: SearchTypes!) {
    search(input: { key: $key, type: $type, first: 5 }) {
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
            ...UserDigestRichUserPublic
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
  ${UserDigest.Rich.fragments.user.public}
  ${ArticleDigestDropdown.fragments.article}
  ${Tag.fragments.tag}
`
