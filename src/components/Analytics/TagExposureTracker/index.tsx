import { useEffect, useState } from 'react'

import { analytics } from '~/common/utils'
import { useIntersectionObserver } from '~/components/Hook'

export const TagExposureTracker = ({
  id,
  location,
}: {
  location: number | string
  id: string
}) => {
  const [timerId, setTimerId] = useState<number>()
  const [recorded, setRecorded] = useState(false)
  const { isIntersecting, ref } = useIntersectionObserver()

  const onEnter = () => {
    // start timing 500ms after scroll into view
    // only start timer if it has not been setup
    if (!recorded) {
      const timer = window.setTimeout(() => {
        // analytics
        analytics.trackEvent('tag_exposure', {
          location,
          id,

          // performance.now() = Date.now() - performance.timing.navigationStart
          delay_msecs: window?.performance.now() ?? -1,
        })
        setRecorded(true)
      }, 500)
      setTimerId(timer)
    }
  }

  const onLeave = () => window.clearTimeout(timerId)

  useEffect(() => {
    if (isIntersecting) {
      onEnter()
    } else {
      onLeave()
    }
  }, [isIntersecting])

  // clean up when unmount
  useEffect(() => () => window.clearTimeout(timerId), [timerId])

  return <span ref={ref} />
}
