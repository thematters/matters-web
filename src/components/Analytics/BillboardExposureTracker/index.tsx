import { useEffect, useState } from 'react'
import { Waypoint } from 'react-waypoint'

import { analytics } from '~/common/utils'

export const BillboardExposureTracker = ({
  id,
  type,
  horizontal = false,
}: {
  id: string
  type: string
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
            analytics.trackEvent('billboard_exposure', {
              id,
              type,
              delay_msecs: window?.performance.now() ?? -1,
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
