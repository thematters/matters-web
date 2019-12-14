import { useQuery } from '@apollo/react-hooks'

import { Icon, TextIcon, Translate } from '~/components'
import { DraftPublishState } from '~/components/GQL/queries/__generated__/DraftPublishState'
import DRAFT_PUBLISH_STATE from '~/components/GQL/queries/draftPublishState'
import { useCountdown } from '~/components/Hook'

import { ADD_TOAST, TEXT } from '~/common/enums'
import ICON_ARROW_CIRCLE from '~/static/icons/arrow-right-green-circle.svg?sprite'
import ICON_LOADING from '~/static/icons/loading.svg?sprite'

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
      icon={
        <Icon
          id={isPublishing ? ICON_LOADING.id : ICON_ARROW_CIRCLE.id}
          viewBox={
            isPublishing ? ICON_LOADING.viewBox : ICON_ARROW_CIRCLE.viewBox
          }
          size="small"
        />
      }
      size="sm"
      color="green"
      weight="medium"
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
