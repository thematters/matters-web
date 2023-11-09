import gql from 'graphql-tag'

import { CircleInvitation } from '../CircleInvitation'

export const CIRCLE_PENDING_INVITES = gql`
  query CirclePendingInvites($name: String!, $after: String) {
    circle(input: { name: $name }) {
      id
      owner {
        id
      }
      invites {
        pending(input: { first: 20, after: $after }) {
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
