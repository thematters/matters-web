import gql from 'graphql-tag'

import ArticleList from '../ContentList/ArticleList'
import ChapterList from '../ContentList/ChapterList'
import PutTopicDialog from '../Dialogs/PutTopicDialog'
import TopicHead from './TopicHead'

export const EDIT_TOPIC_TOPIC_DETAIL = gql`
  query EditTopicTopicDetail($id: ID!) {
    node(input: { id: $id }) {
      ... on Topic {
        id
        chapterCount
        articleCount
        articles {
          id
          ...TopicArticleListArticle
        }
        chapters {
          id
          ...ChapterListChapter
        }
        ...TopicHeadTopic
        ...PutTopicDialogTopic
      }
    }
  }
  ${ArticleList.fragments.article}
  ${ChapterList.fragments.chapter}
  ${TopicHead.fragments.topic}
  ${PutTopicDialog.fragments.topic}
`
