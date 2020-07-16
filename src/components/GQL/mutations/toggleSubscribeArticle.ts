import { gql } from '@apollo/client'

export default gql`
  mutation ToggleSubscribeArticle($id: ID!) {
    toggleSubscribeArticle(input: { id: $id }) {
      id
      subscribed
    }
  }
`
