import { useQuery } from 'react-apollo'

import { Translate } from '~/components'
import { PublishStateDraft } from '~/components/GQL/fragments/__generated__/PublishStateDraft'
import { DraftPublishState } from '~/components/GQL/queries/__generated__/DraftPublishState'
import DRAFT_PUBLISH_STATE from '~/components/GQL/queries/draftPublishState'
import { useCountdown } from '~/components/Hook'
import { Toast } from '~/components/Toast'

import { TEXT } from '~/common/enums'

const PendingState = ({ draft }: { draft: PublishStateDraft }) => {
  const scheduledAt = draft.scheduledAt
  const {
    countdown: { timeLeft },
    formattedTimeLeft
  } = useCountdown({ timeLeft: Date.parse(scheduledAt) - Date.now() })
  const isPublishing = !scheduledAt || !timeLeft || timeLeft <= 0

  useQuery<DraftPublishState>(DRAFT_PUBLISH_STATE, {
    variables: { id: draft.id },
    pollInterval: 1000 * 2,
    errorPolicy: 'none',
    fetchPolicy: 'network-only',
    skip: !process.browser || !isPublishing
  })

  return (
    <Toast
      color="green"
      header={
        isPublishing ? (
          <Translate
            zh_hant={TEXT.zh_hant.publishing}
            zh_hans={TEXT.zh_hans.publishing}
          />
        ) : (
          <Translate
            zh_hant={`${TEXT.zh_hant.waitingForPublish} (${formattedTimeLeft.mmss})`}
            zh_hans={`${TEXT.zh_hans.waitingForPublish} (${formattedTimeLeft.mmss})`}
          />
        )
      }
      content={
        <Translate
          zh_hant="上鏈後，作品不可刪改，永久保存"
          zh_hans="上链后，作品不可删改，永久保存"
        />
      }
      buttonPlacement="bottom"
    />
  )
}

export default PendingState
