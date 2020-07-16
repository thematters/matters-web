import { gql } from '@apollo/client'

export default gql`
  query TagArticlesCount($id: ID!) {
    node(input: { id: $id }) {
      ... on Tag {
        id
        articles(input: { first: 0, selected: false }) {
          totalCount
        }
      }
    }
  }
`
