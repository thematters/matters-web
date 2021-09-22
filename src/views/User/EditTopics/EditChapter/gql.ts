import gql from 'graphql-tag'

import ArticleList from '../ContentList/ArticleList'
import PutChapterDialog from '../Dialogs/PutChapterDialog'
import ChapterHead from './ChapterHead'
import DropdownActions from './DropdownActions'

export const EDIT_TOPIC_CHAPTER_DETAIL = gql`
  query EditTopicChapterDetail($id: ID!) {
    node(input: { id: $id }) {
      ... on Chapter {
        id
        title
        articleCount
        articles {
          id
          ...TopicArticleListArticle
        }
        ...ChapterHeadChapter
        ...PutChapterDialogChapter
        ...DropdownActionsChapter
      }
    }
  }
  ${ArticleList.fragments.article}
  ${ChapterHead.fragments.chapter}
  ${PutChapterDialog.fragments.chapter}
  ${DropdownActions.fragments.chapter}
`
