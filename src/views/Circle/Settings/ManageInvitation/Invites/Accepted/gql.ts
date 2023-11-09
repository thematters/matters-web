import gql from 'graphql-tag'

import { CircleInvitation } from '../CircleInvitation'

export const CIRCLE_ACCEPTED_INVITES = gql`
  query CircleAcceptedInvites($name: String!, $after: String) {
    circle(input: { name: $name }) {
      id
      owner {
        id
      }
      invites {
        accepted(input: { first: 20, after: $after }) {
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
  }
  ${CircleInvitation.fragments.invitation}
`
