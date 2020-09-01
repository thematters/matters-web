import gql from 'graphql-tag'

export const fragments = {
  article: {
    public: gql`
      fragment AppreciationButtonArticlePublic on Article {
        id
        author {
          id
        }
        appreciationsReceivedTotal
        appreciateLimit
      }
    `,
    private: gql`
      fragment AppreciationButtonArticlePrivate on Article {
        id
        hasAppreciate
        appreciateLeft
        canSuperLike @include(if: $includeCanSuperLike)
      }
    `,
  },
}

export const APPRECIATE_ARTICLE = gql`
  mutation AppreciateArticle(
    $id: ID!
    $amount: Int!
    $token: String!
    $superLike: Boolean
  ) {
    appreciateArticle(
      input: { id: $id, amount: $amount, token: $token, superLike: $superLike }
    ) {
      id
      canSuperLike
    }
  }
`
