import { gql } from '@apollo/client'

export default gql`
  mutation ToggleSubscribeArticle($id: ID!, $enabled: Boolean) {
    toggleSubscribeArticle(input: { id: $id, enabled: $enabled }) {
      id
      subscribed
    }
  }
`
