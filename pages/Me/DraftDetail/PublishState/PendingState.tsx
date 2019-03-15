import { useState } from 'react'
import { Query } from 'react-apollo'

import { Translate, useInterval } from '~/components'
import RecallButton from '~/components/DraftDigest/Components/RecallButton'
import { PublishStateDraft } from '~/components/GQL/fragments/__generated__/PublishStateDraft'
import DRAFT_PUBLISH_STATE from '~/components/GQL/queries/draftPublishState'
import { Toast } from '~/components/Toast'

import { countDownToTime, leftPad } from '~/common/utils'

const PendingState = ({ draft }: { draft: PublishStateDraft }) => {
  const scheduledAt = draft.scheduledAt
  const timeLeft = Date.parse(scheduledAt) - Date.now()
  const isPublishing = !scheduledAt || !timeLeft || timeLeft <= 0

  const [left, setLeft] = useState(timeLeft || 0)
  useInterval(() => {
    if (left > 0) {
      setLeft(Math.max(left - 1000, 0))
    }
  }, 1000)
  const leftFormatted = countDownToTime(left)

  return (
    <Query
      variables={{ id: draft.id }}
      query={DRAFT_PUBLISH_STATE}
      pollInterval={1000 * 5}
      errorPolicy="none"
      skip={!process.browser}
    >
      {() => (
        <Toast
          color="green"
          header={
            isPublishing ? (
              <Translate zh_hant="正在發佈" zh_hans="正在发布" />
            ) : (
              <Translate
                zh_hant={({ l }) =>
                  `正在等待發佈 (${leftPad(l.mins, 2, 0)}:${leftPad(
                    l.secs,
                    2,
                    0
                  )})`
                }
                zh_hans={({ l }) =>
                  `正在等待发布 (${leftPad(l.mins, 2, 0)}:${leftPad(
                    l.secs,
                    2,
                    0
                  )})`
                }
                data={{ l: leftFormatted }}
              />
            )
          }
          content={
            <Translate
              zh_hant="上鏈後，文章不可刪改，永久保存"
              zh_hans="上链后，文章不可删改，永久保存"
            />
          }
          customButton={
            <RecallButton
              id={draft.id}
              text={<Translate zh_hant="撤銷" zh_hans="撤销" />}
            />
          }
          buttonPlacement="bottom"
        />
      )}
    </Query>
  )
}

export default PendingState
