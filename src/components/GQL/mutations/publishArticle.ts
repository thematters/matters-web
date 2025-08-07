import { gql } from '@apollo/client'

export default gql`
  mutation PublishArticle($id: ID!, $publishAt: DateTime) {
    publishArticle(input: { id: $id, publishAt: $publishAt }) {
      id
      publishState
      publishAt
      updatedAt
    }
  }
`
