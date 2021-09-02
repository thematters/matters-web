import gql from 'graphql-tag'

export const fragments = {
  article: gql`
    fragment CircleContentAnalyticsArticle on Article {
      id
      title
      slug
      mediaHash
      createdAt
      author {
        id
        userName
      }
    }
  `,
}
