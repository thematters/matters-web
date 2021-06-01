import gql from 'graphql-tag'

export default gql`
  mutation PutCircleArticles(
    $id: ID!
    $articles: [ID!]
    $type: PutCircleArticlesType!
    $accessType: ArticleAccessType!
    $license: ArticleLicenseType!
  ) {
    putCircleArticles(
      input: {
        id: $id
        articles: $articles
        type: $type
        accessType: $accessType
        license: $license
      }
    ) {
      id
    }
  }
`
