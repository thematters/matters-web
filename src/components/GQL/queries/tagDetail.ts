import gql from 'graphql-tag'

export default gql`
  query TagDetail($id: ID!) {
    node(input: { id: $id }) {
      ... on Tag {
        id
        content
        description
      }
    }
  }
`
