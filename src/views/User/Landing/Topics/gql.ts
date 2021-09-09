import gql from 'graphql-tag'

import { ArticleTopicDigest } from '~/components'

export const USER_TOPICS_PUBLIC = gql`
  query UserTopicsPublic($userName: String!) {
    user(input: { userName: $userName }) {
      id
      topics {
        ...ArticleTopicDigestTopic
      }
    }
  }
  ${ArticleTopicDigest.fragments.topic}
`
