import gql from 'graphql-tag'
import _find from 'lodash/find'
import _isEmpty from 'lodash/isEmpty'
import _pickBy from 'lodash/pickBy'

import { AppreciatorsDialog } from '~/components/Dialogs/AppreciatorsDialog'
import { SupportersDialog } from '~/components/Dialogs/SupportersDialog'

import ArchiveArticle from './ArchiveArticle'
import EditButton from './EditButton'
import ExtendButton from './ExtendButton'
import PinButton from './PinButton'
import RemoveTagButton from './RemoveTagButton'
import SetTagSelectedButton from './SetTagSelectedButton'
import SetTagUnselectedButton from './SetTagUnselectedButton'

export const fragments = {
  article: gql`
    fragment DropdownActionsArticle on Article {
      id
      ...AppreciatorsDialogArticle
      ...SupportsDialogArticle
      ...ArchiveArticleArticle
      ...PinButtonArticle
      ...ExtendButtonArticle
      ...RemoveTagButtonArticle
      ...EditArticleButtonArticle
      ...SetTagSelectedButtonArticle
      ...SetTagUnselectedButtonArticle
    }
    ${AppreciatorsDialog.fragments.article}
    ${SupportersDialog.fragments.article}
    ${PinButton.fragments.article}
    ${ArchiveArticle.fragments.article}
    ${ExtendButton.fragments.article}
    ${RemoveTagButton.fragments.article}
    ${EditButton.fragments.article}
    ${SetTagSelectedButton.fragments.article}
    ${SetTagUnselectedButton.fragments.article}
  `,
}
