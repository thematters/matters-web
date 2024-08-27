import { useEffect, useState } from 'react'

import { analytics } from '~/common/utils'
import { useIntersectionObserver } from '~/components/Hook'

export const BillboardExposureTracker = ({
  id,
  type,
}: {
  id: number
  type: string
}) => {
  const [timerId, setTimerId] = useState<number>()
  const [recorded, setRecorded] = useState(false)
  const { isIntersecting, ref } = useIntersectionObserver()

  const onEnter = () => {
    // start timing 250ms after scroll into view
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
      }, 250)
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
