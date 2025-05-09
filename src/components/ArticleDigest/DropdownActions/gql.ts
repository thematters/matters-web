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
import ToggleAdArticle from './ToggleAdArticle'
import ToggleRecommendArticle from './ToggleRecommendArticle'
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
      ...ToggleAdArticleArticle
      ...ToggleRecommendArticleArticle
    }
    ${AppreciatorsDialog.fragments.article}
    ${SupportersDialog.fragments.article}
    ${PinButton.fragments.article}
    ${ArchiveArticle.fragments.article}
    ${ExtendButton.fragments.article}
    ${EditButton.fragments.article}
    ${ToggleAdArticle.fragments.article}
    ${ToggleRecommendArticle.fragments.article}
  `,
}
