import gql from 'graphql-tag'

import TopicCounts from '~/components/ArticleTopicDigest/TopicCounts'

export const fragments = {
  topic: gql`
    fragment TopicHeadTopic on Topic {
      id
      title
      ...TopicCountsTopic
    }
    ${TopicCounts.fragments.topic}
  `,
}
