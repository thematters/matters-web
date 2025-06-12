import { useEffect, useState } from 'react'

import { analytics } from '~/common/utils'
import { useIntersectionObserver } from '~/components/Hook'

export const BannerExposureTracker = ({
  id,
  location,
  // feedType,
  // contentType,
  title,
  link,
  lang,
}: {
  id: string
  location: number | string
  // feedType: FeedType
  // contentType: ContentType | ActivityType
  title: string
  link: string
  lang: Language
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
        analytics.trackEvent('banner_exposure', {
          // feedType,
          // contentType,
          id,
          location,
          title,
          link,
          lang,
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
