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
      revisionCount
      revisedAt
      createdAt
      author {
        id
        userName
      }
      campaigns {
        campaign {
          id
          name
          shortHash
        }
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
