import Router from 'next/router'
import { useContext, useEffect } from 'react'

import { ViewerContext } from '~/components'

import { analytics } from '~/common/utils'

const PageViewTracker = () => {
  const viewer = useContext(ViewerContext)

  // first load
  useEffect(() => {
    if (!viewer.privateFetched) {
      return
    }

    analytics.identifyUser()
    analytics.trackPage()
  }, [viewer.privateFetched])

  // subsequent changes
  useEffect(() => {
    const trackPage = () => {
      if (!viewer.privateFetched) {
        return
      }

      analytics.trackPage()
    }

    Router.events.on('routeChangeComplete', trackPage)

    return () => {
      Router.events.off('routeChangeComplete', trackPage)
    }
  }, [viewer.privateFetched])

  return null
}

export default PageViewTracker
