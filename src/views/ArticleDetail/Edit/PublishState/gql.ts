import gql from 'graphql-tag'

export const LATEST_VERSION_ARTICLE = gql`
  query LatestVersionArticle($id: ID!) {
    article: node(input: { id: $id }) {
      ... on Article {
        id
        author {
          id
          userName
        }
        slug
        title
        mediaHash
        versions(input: { first: 1 }) {
          edges {
            node {
              id
            }
          }
        }
      }
    }
  }
`
