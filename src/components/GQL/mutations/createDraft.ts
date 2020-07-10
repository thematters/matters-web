import gql from 'graphql-tag'

export default gql`
  mutation CreateDraft($title: String!, $tags: [String!]) {
    putDraft(input: { title: $title, tags: $tags }) {
      id
      slug
    }
  }
`
