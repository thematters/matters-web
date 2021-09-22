import gql from 'graphql-tag'

import TopicCounts from '~/components/ArticleTopicDigest/TopicCounts'

import AddButton from './AddButton'

export const fragments = {
  topic: gql`
    fragment TopicHeadTopic on Topic {
      id
      title
      ...TopicCountsTopic
      ...AddButtonTopic
    }
    ${TopicCounts.fragments.topic}
    ${AddButton.fragments.topic}
  `,
}
