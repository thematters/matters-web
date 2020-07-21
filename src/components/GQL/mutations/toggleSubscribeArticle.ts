import gql from 'graphql-tag'

export default gql`
  mutation ToggleSubscribeArticle($id: ID!, $enabled: Boolean) {
    toggleSubscribeArticle(input: { id: $id, enabled: $enabled }) {
      id
      subscribed
    }
  }
`
