import { gql } from '@apollo/client'

export default gql`
  mutation CreateDraft($title: String!, $tags: [String!]) {
    putDraft(input: { title: $title, tags: $tags }) {
      id
      slug
    }
  }
`
