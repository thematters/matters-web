import gql from 'graphql-tag'

export const EDIT_TOPIC_TOPICS = gql`
  query EditTopicTopics($after: String) {
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
              articleCount
            }
          }
        }
      }
    }
  }
`
