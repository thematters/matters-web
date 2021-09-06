import { useEffect, useState } from 'react'
import { Waypoint } from 'react-waypoint'

import { ActivityType, analytics, ContentType, FeedType } from '~/common/utils'

export const CardExposureTracker = ({
  id,
  location,
  feedType,
  contentType,
  horizontal = false,
}: {
  location: number | string
  id: string
  feedType: FeedType
  contentType: ContentType | ActivityType
  horizontal?: boolean
}) => {
  const [timerId, setTimerId] = useState<number>()
  const [recorded, setRecorded] = useState(false)

  // clean up when unmount
  useEffect(() => () => window.clearTimeout(timerId), [timerId])

  return (
    <Waypoint
      onEnter={() => {
        // start timing 500ms after scroll into view
        // only start timer if it has not been setup
        if (!recorded) {
          const timer = window.setTimeout(() => {
            // analytics
            analytics.trackEvent('card_exposure', {
              feedType,
              contentType,
              location,
              id,
            })
            setRecorded(true)
          }, 500)
          setTimerId(timer)
        }
      }}
      // cancel timer on leave
      onLeave={() => window.clearTimeout(timerId)}
      horizontal={horizontal}
    />
  )
}
