import gql from 'graphql-tag'

import PutChapterDialog from '../PutChapterDialog'
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
          title
        }
        ...ChapterHeadChapter
        ...PutChapterDialogChapter
        ...DropdownActionsChapter
      }
    }
  }
  ${ChapterHead.fragments.chapter}
  ${PutChapterDialog.fragments.chapter}
  ${DropdownActions.fragments.chapter}
`
