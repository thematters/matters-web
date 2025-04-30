import gql from 'graphql-tag'

export const LATEST_VERSION_ARTICLE = gql`
  query LatestVersionArticle($id: ID!) {
    article: node(input: { id: $id }) {
      ... on Article {
        id
        author {
          id
          userName
          displayName
        }
        slug
        title
        shortHash
        tags {
          id
          content
        }
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
