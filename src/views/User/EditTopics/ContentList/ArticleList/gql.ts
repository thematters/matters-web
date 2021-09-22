import gql from 'graphql-tag'

export const fragments = {
  article: gql`
    fragment TopicArticleListArticle on Article {
      id
      title
    }
  `,
}
