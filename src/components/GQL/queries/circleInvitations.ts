import gql from 'graphql-tag'

import { CircleInvitation } from '~/components'

export const CIRCLE_INVITATIONS = gql`
  query CircleInvitations($name: String!, $after: String) {
    circle(input: { name: $name }) {
      id
      owner {
        id
      }
      invitations(input: { first: 20, after: $after }) {
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
        edges {
          cursor
          node {
            id
            ...CircleInvitation
          }
        }
      }
    }
  }
  ${CircleInvitation.fragments.invitation}
`
