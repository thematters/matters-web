import gql from 'graphql-tag'

export default gql`
  mutation ArchiveArticle($id: ID!) {
    archiveArticle(input: { id: $id }) {
      id
      state
    }
  }
`
