import { gql } from '@apollo/client'

export default gql`
  mutation PutCircleArticles(
    $id: ID!
    $articles: [ID!]
    $type: PutCircleArticlesType!
    $accessType: ArticleAccessType!
  ) {
    putCircleArticles(
      input: {
        id: $id
        articles: $articles
        type: $type
        accessType: $accessType
      }
    ) {
      id
    }
  }
`
