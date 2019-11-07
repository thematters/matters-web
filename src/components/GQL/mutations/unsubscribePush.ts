import gql from 'graphql-tag'

export default gql`
  mutation UnsubscribePush($id: ID!) {
    unsubscribePush(input: { deviceId: $id }) {
      id
    }
  }
`
