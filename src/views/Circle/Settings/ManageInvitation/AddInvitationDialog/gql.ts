import gql from 'graphql-tag'

export const INVITATIONS_CIRCLE = gql`
  query InvitationsCircle($name: String!) {
    circle(input: { name: $name }) {
      id
    }
  }
`
