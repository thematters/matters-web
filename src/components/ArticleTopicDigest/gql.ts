import gql from 'graphql-tag'

import { ArticleDigestTitle } from '~/components/ArticleDigest'

import TopicCounts from './TopicCounts'

export const fragments = {
  topic: gql`
    fragment ArticleTopicDigestTopic on Topic {
      id
      title
      description
      cover
      author {
        id
        userName
      }
      latestArticle {
        ...ArticleDigestTitleArticle
      }
      ...TopicCountsTopic
    }
    ${ArticleDigestTitle.fragments.article}
    ${TopicCounts.fragments.topic}
  `,
}
