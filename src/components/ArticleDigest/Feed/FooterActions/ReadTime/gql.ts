import gql from 'graphql-tag'

export const fragments = {
  article: gql`
    fragment ActionsReadTimeArticle on Article {
      id
      readTime
    }
  `,
}
