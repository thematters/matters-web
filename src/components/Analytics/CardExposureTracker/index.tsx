import { useContext, useRef } from 'react'
import { Waypoint } from 'react-waypoint'

import { useInView, ViewerContext } from '~/components'

import { ActivityType, analytics, ContentType, FeedType } from '~/common/utils'

export const CardExposureTracker = ({
  articleId,
  location,
  feedType,
  contentType,
}: {
  location: number | string
  articleId: string
  feedType: FeedType
  contentType: ContentType | ActivityType
}) => {
  const viewer = useContext(ViewerContext)
  const ref = useRef(null)
  const isVisible = useInView(ref)

  return (
    <Waypoint
      ref={ref}
      onEnter={() => {
        // start timing 500ms after scroll into view
        setTimeout(() => {
          // analytics
          if (isVisible) {
            analytics.trackEvent('card_exposure', {
              feedType,
              contentType,
              location,
              userId: viewer.id,
              articleId,
            })
          }
        }, 500)
      }}
    />
  )
}
