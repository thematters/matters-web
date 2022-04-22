import { useQuery } from '@apollo/react-hooks'

import { Toast, Translate } from '~/components'
import DRAFT_PUBLISH_STATE from '~/components/GQL/queries/draftPublishState'

import { PublishStateDraft } from '~/components/GQL/fragments/__generated__/PublishStateDraft'
import { DraftPublishState } from '~/components/GQL/queries/__generated__/DraftPublishState'

const PendingState = ({ draft }: { draft: PublishStateDraft }) => {
  useQuery<DraftPublishState>(DRAFT_PUBLISH_STATE, {
    variables: { id: draft.id },
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
          en="Your work will be permanent and unalterable after being published on blockchain"
        />
      }
    />
  )
}

export default PendingState
