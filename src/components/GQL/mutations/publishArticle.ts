import { gql } from '@apollo/client'

export default gql`
  mutation PublishArticle($id: ID!) {
    publishArticle(input: { id: $id }) {
      id
      publishState
    }
  }
`
