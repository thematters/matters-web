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
      mediaHash
      author {
        id
        userName
      }
    }
  `,
}
