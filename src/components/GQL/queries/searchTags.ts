import gql from 'graphql-tag'

export default gql`
  query SearchTagsQuery($search: String!) {
    search(input: { key: $search, type: Tag, first: 5 }) {
      edges {
        node {
          ... on TagSearchResult {
            id
            tag {
              id
              content
            }
            numArticles
          }
        }
      }
    }
  }
`
