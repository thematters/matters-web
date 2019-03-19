import { Query, QueryResult } from 'react-apollo'

import { Icon, TextIcon, Translate } from '~/components'
import { DraftPublishState } from '~/components/GQL/queries/__generated__/DraftPublishState'
import DRAFT_PUBLISH_STATE from '~/components/GQL/queries/draftPublishState'
import { useCountdown } from '~/components/Hook'

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

  return (
    <Query
      variables={{ id: draft.id }}
      query={DRAFT_PUBLISH_STATE}
      pollInterval={1000 * 5}
      errorPolicy="none"
      skip={!process.browser || !isPublishing}
    >
      {({ data }: QueryResult & { data: DraftPublishState }) => {
        if (
          data &&
          data.node &&
          data.node.publishState === 'published' &&
          process.browser
        ) {
          window.dispatchEvent(
            new CustomEvent('addToast', {
              detail: {
                color: 'green',
                content: <Translate zh_hant="文章已發布" zh_hans="文章已发布" />
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
                  isPublishing
                    ? ICON_LOADING.viewBox
                    : ICON_ARROW_CIRCLE.viewBox
                }
                size="small"
              />
            }
            size="sm"
            color="green"
            weight="medium"
          >
            {isPublishing ? (
              <Translate zh_hant="正在發佈" zh_hans="正在发布" />
            ) : (
              <Translate
                zh_hant={`正在等待發佈 (${formattedTimeLeft.mmss})`}
                zh_hans={`正在等待发布 (${formattedTimeLeft.mmss})`}
              />
            )}
          </TextIcon>
        )
      }}
    </Query>
  )
}

export default PendingState
