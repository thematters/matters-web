import { useQuery } from '@apollo/react-hooks'

import { Icon, TextIcon, Translate } from '~/components'
import DRAFT_PUBLISH_STATE from '~/components/GQL/queries/draftPublishState'
import { useCountdown } from '~/components/Hook'

import { ADD_TOAST, TEXT } from '~/common/enums'

import { DraftPublishState } from '~/components/GQL/queries/__generated__/DraftPublishState'
import { FeedDigestDraft } from '../FeedDigest/__generated__/FeedDigestDraft'

const PendingState = ({ draft }: { draft: FeedDigestDraft }) => {
  const scheduledAt = draft.scheduledAt
  const {
    countdown: { timeLeft },
    formattedTimeLeft
  } = useCountdown({ timeLeft: Date.parse(scheduledAt) - Date.now() })
  const isPublishing = !scheduledAt || !timeLeft || timeLeft <= 0

  const { data } = useQuery<DraftPublishState>(DRAFT_PUBLISH_STATE, {
    variables: { id: draft.id },
    pollInterval: 1000 * 5,
    errorPolicy: 'none',
    fetchPolicy: 'network-only',
    skip: !process.browser || !isPublishing
  })

  if (
    data &&
    data.node &&
    data.node.__typename === 'Draft' &&
    data.node.publishState === 'published' &&
    process.browser
  ) {
    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'green',
          content: (
            <Translate
              zh_hant={TEXT.zh_hant.published}
              zh_hans={TEXT.zh_hans.published}
            />
          )
        }
      })
    )
  }

  return (
    <TextIcon
      icon={isPublishing ? <Icon.Loading /> : null}
      size="sm"
      color="green"
      weight="md"
    >
      {isPublishing ? (
        <Translate
          zh_hant={TEXT.zh_hant.publishing}
          zh_hans={TEXT.zh_hans.publishing}
        />
      ) : (
        <Translate
          zh_hant={`${TEXT.zh_hant.waitingForPublish} (${formattedTimeLeft.mmss})`}
          zh_hans={`${TEXT.zh_hans.waitingForPublish} (${formattedTimeLeft.mmss})`}
        />
      )}
    </TextIcon>
  )
}

export default PendingState
