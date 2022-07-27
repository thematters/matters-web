import gql from 'graphql-tag'

import { Tag } from '~/components'

export const SEARCH_TAGS_PUBLIC = gql`
  query SearchTagsPublic($key: String!, $after: String) {
    search(input: { key: $key, type: Tag, first: 20, after: $after }) {
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          ... on Tag {
            ...DigestTag
          }
        }
      }
    }
  }
  ${Tag.fragments.tag}
`
