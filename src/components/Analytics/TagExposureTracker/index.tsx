import { useEffect, useState } from 'react'
import { Waypoint } from 'react-waypoint'

import { analytics } from '~/common/utils'

export const TagExposureTracker = ({
  id,
  location,
  horizontal = false,
}: {
  location: number | string
  id: string
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
            analytics.trackEvent('tag_exposure', {
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
