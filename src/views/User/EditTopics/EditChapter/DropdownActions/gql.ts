import gql from 'graphql-tag'

import PutChapterDialog from '../../PutChapterDialog'
import DeleteChapterDialog from './DeleteChapterDialog'

export const fragments = {
  chapter: gql`
    fragment DropdownActionsChapter on Chapter {
      id
      topic {
        id
      }
      ...DeleteChapterDialogChapter
      ...PutChapterDialogChapter
    }
    ${DeleteChapterDialog.fragments.chapter}
    ${PutChapterDialog.fragments.chapter}
  `,
}
