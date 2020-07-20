import gql from 'graphql-tag'

export default gql`
  mutation ToggleBlockUser($id: ID!, $enabled: Boolean) {
    toggleBlockUser(input: { id: $id, enabled: $enabled }) {
      id
      isBlocked
    }
  }
`
