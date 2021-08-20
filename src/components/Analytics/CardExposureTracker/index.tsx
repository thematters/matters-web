import { useContext, useState } from 'react'
import { Waypoint } from 'react-waypoint'

import { ViewerContext } from '~/components'

import { ActivityType, analytics, ContentType, FeedType } from '~/common/utils'

export const CardExposureTracker = ({
  id,
  location,
  feedType,
  contentType,
}: {
  location: number | string
  id: string
  feedType: FeedType
  contentType: ContentType | ActivityType
}) => {
  const viewer = useContext(ViewerContext)
  const [timerId, setTimerId] = useState<number>()

  return (
    <Waypoint
      onEnter={() => {
        // start timing 500ms after scroll into view
        // only start timer if it has not been setup
        if (!timerId) {
          const timer = window.setTimeout(() => {
            // analytics
            analytics.trackEvent('card_exposure', {
              feedType,
              contentType,
              location,
              userId: viewer.id,
              id,
            })
          }, 500)
          setTimerId(timer)
        }
      }}
      onLeave={() => window.clearTimeout(timerId)}
    />
  )
}
