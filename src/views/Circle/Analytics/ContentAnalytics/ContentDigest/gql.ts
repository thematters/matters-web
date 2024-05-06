import gql from 'graphql-tag'

export const fragments = {
  article: gql`
    fragment CircleContentAnalyticsArticle on Article {
      id
      title
      slug
      shortHash
      createdAt
      author {
        id
        userName
      }
    }
  `,
}
