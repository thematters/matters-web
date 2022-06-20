import gql from 'graphql-tag'

export const RELATED_TAGS = gql`
  query TagDetailRecommended($id: ID!) {
    node(input: { id: $id }) {
      ... on Tag {
        id
        recommended(input: {}) {
          edges {
            cursor
            node {
              id
              content
              description
              cover
              numArticles
              numAuthors
            }
          }
        }
      }
    }
  }
`
