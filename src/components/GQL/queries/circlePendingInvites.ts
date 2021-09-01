import gql from 'graphql-tag'

import { CircleInvitation } from '~/components'

export default gql`
  query CirclePendingInvites($userName: String!, $after: String) {
    user(input: { userName: $userName }) {
      id
      ownCircles {
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
  }
  ${CircleInvitation.fragments.invitation}
`
