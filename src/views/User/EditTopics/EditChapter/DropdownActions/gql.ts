import gql from 'graphql-tag'

import DeleteChapterDialog from '../../Dialogs/DeleteChapterDialog'
import PutChapterDialog from '../../Dialogs/PutChapterDialog'

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
