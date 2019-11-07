import gql from 'graphql-tag'

export default gql`
  mutation SubscribePush($id: ID!) {
    subscribePush(input: { deviceId: $id }) {
      id
    }
  }
`
