import gql from 'graphql-tag';

export default gql`
  query SearchTagsQuery($search: String!) {
    search(input: { key: $search, type: Tag, first: 5 }) {
      edges {
        node {
          ... on Tag {
            id
            content
            articles(input: { first: 0 }) {
              totalCount
            }
          }
        }
      }
    }
  }
`;
