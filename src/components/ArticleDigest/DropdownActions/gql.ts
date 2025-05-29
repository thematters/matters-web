import gql from 'graphql-tag'

import { AppreciatorsDialog } from '~/components/Dialogs/AppreciatorsDialog'
import { SupportersDialog } from '~/components/Dialogs/SupportersDialog'

import ArchiveArticle from './ArchiveArticle'
import EditButton from './EditButton'
import ExtendButton from './ExtendButton'
import PinButton from './PinButton'

export const fragments = {
  article: gql`
    fragment DropdownActionsArticle on Article {
      id
      author {
        id
        displayName
      }
      tags {
        id
        content
      }
      ...AppreciatorsDialogArticle
      ...SupportsDialogArticle
      ...ArchiveArticleArticle
      ...PinButtonArticle
      ...ExtendButtonArticle
      ...EditArticleButtonArticle
    }
    ${AppreciatorsDialog.fragments.article}
    ${SupportersDialog.fragments.article}
    ${PinButton.fragments.article}
    ${ArchiveArticle.fragments.article}
    ${ExtendButton.fragments.article}
    ${EditButton.fragments.article}
  `,
}
