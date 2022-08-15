import gql from 'graphql-tag'

import { TagDigest } from '~/components'

export const RELATED_TAGS = gql`
  query TagDetailRecommended($id: ID!, $random: random_Int_min_0_max_49) {
    node(input: { id: $id }) {
      ... on Tag {
        id
        recommended(input: { first: 10, filter: { random: $random } }) {
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
