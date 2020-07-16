import { useQuery } from '@apollo/client'

import { Toast, Translate, useCountdown } from '~/components'
import DRAFT_PUBLISH_STATE from '~/components/GQL/queries/draftPublishState'

import { TEXT } from '~/common/enums'

import { PublishStateDraft } from '~/components/GQL/fragments/__generated__/PublishStateDraft'
import { DraftPublishState } from '~/components/GQL/queries/__generated__/DraftPublishState'

const PendingState = ({ draft }: { draft: PublishStateDraft }) => {
  const scheduledAt = draft.scheduledAt
  const {
    countdown: { timeLeft },
    formattedTimeLeft,
  } = useCountdown({ timeLeft: Date.parse(scheduledAt) - Date.now() })
  const isPublishing = !scheduledAt || !timeLeft || timeLeft <= 0

  useQuery<DraftPublishState>(DRAFT_PUBLISH_STATE, {
    variables: { id: draft.id },
    pollInterval: 1000 * 2,
    errorPolicy: 'none',
    fetchPolicy: 'network-only',
    skip: !process.browser || !isPublishing,
  })

  return (
    <Toast.Instance
      color="green"
      content={
        isPublishing ? (
          <Translate id="publishing" />
        ) : (
          <Translate
            zh_hant={`${TEXT.zh_hant.waitingForPublish} (${formattedTimeLeft.mmss})`}
            zh_hans={`${TEXT.zh_hans.waitingForPublish} (${formattedTimeLeft.mmss})`}
          />
        )
      }
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
