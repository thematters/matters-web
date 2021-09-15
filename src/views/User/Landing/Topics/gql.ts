import gql from 'graphql-tag'

import { ArticleTopicDigest } from '~/components'

export const USER_TOPICS_PUBLIC = gql`
  query UserTopicsPublic($userName: String!, $after: String) {
    user(input: { userName: $userName }) {
      id
      topics(input: { first: 10, after: $after, filter: { public: true } }) {
        totalCount
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
        edges {
          cursor
          node {
            ...ArticleTopicDigestTopic
          }
        }
      }
    }
  }
  ${ArticleTopicDigest.fragments.topic}
`
