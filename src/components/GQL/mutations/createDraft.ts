import gql from 'graphql-tag'

export default gql`
  mutation CreateDraft {
    putDraft(input: { title: "" }) {
      id
      slug
    }
  }
`
