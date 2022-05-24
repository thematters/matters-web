import gql from 'graphql-tag'
import _find from 'lodash/find'
import _isEmpty from 'lodash/isEmpty'
import _pickBy from 'lodash/pickBy'

import { AppreciatorsDialog } from '~/components/Dialogs/AppreciatorsDialog'
import { DonatorsDialog } from '~/components/Dialogs/DonatorsDialog'
import { FingerprintDialog } from '~/components/Dialogs/FingerprintDialog'

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
      ...DonatorDialogArticle
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
    ${DonatorsDialog.fragments.article}
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
