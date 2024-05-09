import gql from 'graphql-tag'

export const fragments = {
  article: gql`
    fragment MetaInfoArticle on Article {
      id
      access {
        type
      }
      language
      slug
      shortHash
      revisedAt
      createdAt
      author {
        id
        userName
      }
    }
  `,
  articleVersion: gql`
    fragment MetaInfoArticleVersion on ArticleVersion {
      id
      createdAt
    }
  `,
}
