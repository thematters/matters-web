import Router from 'next/router'
import { useContext, useEffect } from 'react'

import { ViewerContext } from '~/components'

import { analytics } from '~/common/utils'

const PageViewTracker = () => {
  const viewer = useContext(ViewerContext)

  const trackPage = () => {
    if (!viewer.privateFetched) {
      return
    }
    analytics.trackPage()
  }

  // first load
  useEffect(() => {
    if (!viewer.privateFetched) {
      return
    }

    analytics.identifyUser()
    trackPage()
  }, [viewer.privateFetched])

  // subsequent changes
  useEffect(() => {
    Router.events.on('routeChangeComplete', trackPage)

    return () => {
      Router.events.off('routeChangeComplete', trackPage)
    }
  }, [])

  return null
}

export default PageViewTracker
