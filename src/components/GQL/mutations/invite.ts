import gql from 'graphql-tag'

export default gql`
  mutation InviteCircle($input: InviteCircleInput!) {
    invite(input: $input) {
      id
    }
  }
`
