import gql from 'graphql-tag'

export default gql`
  mutation PutCircleArticles(
    $id: ID!
    $articles: [ID!]
    $type: PutCircleArticlesType!
  ) {
    putCircleArticles(input: { id: $id, articles: $articles, type: $type }) {
      id
    }
  }
`
