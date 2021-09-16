import gql from 'graphql-tag'

import PutTopicDialog from '../PutTopicDialog'
import TopicHead from './TopicHead'

export const EDIT_TOPIC_TOPIC_DETAIL = gql`
  query EditTopicTopicDetail($id: ID!) {
    node(input: { id: $id }) {
      ... on Topic {
        id
        title
        chapterCount
        articleCount
        articles {
          id
          title
        }
        chapters {
          id
          title
          articles {
            id
            title
          }
        }
        ...TopicHeadTopic
        ...PutTopicDialogTopic
      }
    }
  }
  ${TopicHead.fragments.topic}
  ${PutTopicDialog.fragments}
`
