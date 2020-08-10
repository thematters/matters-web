import gql from 'graphql-tag'

import { Tag } from '~/components'

export const USER_TAGS_PUBLIC = gql`
  query UserTagsPublic($userName: String!, $after: String) {
    user(input: { userName: $userName }) {
      id
      displayName
      info {
        description
        profileCover
      }
      tags(input: { first: 20, after: $after }) {
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
        edges {
          cursor
          node {
            ...DigestTag
          }
        }
      }
    }
  }
  ${Tag.fragments.tag}
`
