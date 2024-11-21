import gql from 'graphql-tag'

import { TagDigest } from '~/components'

export const RELATED_TAGS = gql`
  query TagDetailRecommended($id: ID!) {
    node(input: { id: $id }) {
      ... on Tag {
        id
        recommended(input: { first: 5 }) {
          edges {
            cursor
            node {
              ...TagDigestSidebarTag
            }
          }
        }
      }
    }
  }
  ${TagDigest.Sidebar.fragments.tag}
`
