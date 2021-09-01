import gql from 'graphql-tag'

export const INVITATIONS_CIRCLE = gql`
  query InvitationsCircle($userName: String!) {
    user(input: { userName: $userName }) {
      id
      ownCircles {
        id
      }
    }
  }
`
