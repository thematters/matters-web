import gql from 'graphql-tag'

export default gql`
  mutation ToggleSubscribeArticle($id: ID!) {
    toggleSubscribeArticle(input: { id: $id }) {
      id
      subscribed
    }
  }
`
