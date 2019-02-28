import { useState } from 'react'

import { Icon, TextIcon, Translate, useInterval } from '~/components'

import { countDownToTime, leftPad } from '~/common/utils'
import ICON_ARROW_CIRCLE from '~/static/icons/arrow-right-green-circle.svg?sprite'
import ICON_LOADING from '~/static/icons/loading.svg?sprite'

import { FeedDigestDraft } from '../__generated__/FeedDigestDraft'

const PendingState = ({ draft }: { draft: FeedDigestDraft }) => {
  const scheduledAt = draft.scheduledAt
  const timeLeft = Date.parse(scheduledAt) - Date.now()
  const isPublishing = !scheduledAt || !timeLeft || timeLeft <= 0

  const [left, setLeft] = useState(timeLeft || 0)
  useInterval(() => {
    if (left > 0) {
      setLeft(left - 1000)
    }
  }, 1000)
  const leftFormatted = countDownToTime(left)

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
        <Translate zh_hant="正在發佈" zh_hans="正在发布" />
      ) : (
        <Translate
          zh_hant={({ l }) =>
            `正在等待發佈 (${leftPad(l.mins, 2, 0)}:${leftPad(l.secs, 2, 0)})`
          }
          zh_hans={({ l }) =>
            `正在等待发布 (${leftPad(l.mins, 2, 0)}:${leftPad(l.secs, 2, 0)})`
          }
          data={{ l: leftFormatted }}
        />
      )}
    </TextIcon>
  )
}

export default PendingState
