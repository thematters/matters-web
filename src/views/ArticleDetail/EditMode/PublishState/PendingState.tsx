import { useQuery } from '@apollo/react-hooks'

import { Toast, Translate } from '~/components'

import EDIT_MODE_ARTICLE_DRAFTS from './gql'

import { EditModeArticle_article_drafts as EditModeDraft } from '../__generated__/EditModeArticle'
import { EditModeArticleDrafts } from './__generated__/EditModeArticleDrafts'

const PendingState = ({
  draft,
  mediaHash,
}: {
  draft: EditModeDraft
  mediaHash: string
}) => {
  useQuery<EditModeArticleDrafts>(EDIT_MODE_ARTICLE_DRAFTS, {
    variables: { mediaHash },
    pollInterval: 1000 * 2,
    errorPolicy: 'none',
    fetchPolicy: 'network-only',
    skip: !process.browser,
  })

  return (
    <Toast.Instance
      color="green"
      content={<Translate id="publishing" />}
      subDescription={
        <Translate
          zh_hant="上鏈後，作品不可刪改，永久保存"
          zh_hans="上链后，作品不可删改，永久保存"
        />
      }
    />
  )
}

export default PendingState
