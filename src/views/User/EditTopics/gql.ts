import gql from 'graphql-tag'

export const USER_TOPICS = gql`
  query UserTopics($after: String) {
    viewer {
      id
      topics(input: { first: 10, after: $after }) {
        totalCount
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
        edges {
          cursor
          node {
            id
            title
            articleCount
            chapters {
              id
              title
            }
          }
        }
      }
    }
  }
`
