import gql from 'graphql-tag'
import _find from 'lodash/find'
import _isEmpty from 'lodash/isEmpty'
import _pickBy from 'lodash/pickBy'

import { AppreciatorsDialog } from '~/components/Dialogs/AppreciatorsDialog'
import { FingerprintDialog } from '~/components/Dialogs/FingerprintDialog'
import { SupportersDialog } from '~/components/Dialogs/SupportersDialog'

import ArchiveArticle from './ArchiveArticle'
import EditButton from './EditButton'
import ExtendButton from './ExtendButton'
import RemoveTagButton from './RemoveTagButton'
import SetTagSelectedButton from './SetTagSelectedButton'
import SetTagUnselectedButton from './SetTagUnselectedButton'
import StickyButton from './StickyButton'

export const fragments = {
  article: gql`
    fragment DropdownActionsArticle on Article {
      id
      ...AppreciatorsDialogArticle
      ...SupportsDialogArticle
      ...FingerprintArticle
      ...ArchiveArticleArticle
      ...StickyButtonArticle
      ...ExtendButtonArticle
      ...RemoveTagButtonArticle
      ...EditArticleButtonArticle
      ...SetTagSelectedButtonArticle
      ...SetTagUnselectedButtonArticle
    }
    ${AppreciatorsDialog.fragments.article}
    ${SupportersDialog.fragments.article}
    ${FingerprintDialog.fragments.article}
    ${StickyButton.fragments.article}
    ${ArchiveArticle.fragments.article}
    ${ExtendButton.fragments.article}
    ${RemoveTagButton.fragments.article}
    ${EditButton.fragments.article}
    ${SetTagSelectedButton.fragments.article}
    ${SetTagUnselectedButton.fragments.article}
  `,
}
