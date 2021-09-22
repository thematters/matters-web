import gql from 'graphql-tag'

import TopicList from './ContentList/TopicList'

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
            ...TopicListTopic
          }
        }
      }
    }
  }
  ${TopicList.fragments.topic}
`
