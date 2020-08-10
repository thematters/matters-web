import Router from 'next/router'
import { useContext, useEffect, useRef } from 'react'

import { ViewerContext } from '~/components'

import { analytics } from '~/common/utils'

const PageViewTracker = () => {
  const viewer = useContext(ViewerContext)
  const referrer = useRef('')

  // first load
  useEffect(() => {
    if (!viewer.privateFetched) {
      return
    }

    analytics.identifyUser()
    analytics.trackPage()
    referrer.current = window.location.pathname
  }, [viewer.privateFetched])

  // subsequent changes
  useEffect(() => {
    const trackPage = () => {
      if (!viewer.privateFetched) {
        return
      }

      analytics.trackPage('page_view', { page_referrer: referrer.current })
      referrer.current = window.location.pathname
    }

    Router.events.on('routeChangeComplete', trackPage)

    return () => {
      Router.events.off('routeChangeComplete', trackPage)
    }
  }, [viewer.privateFetched])

  return null
}

export default PageViewTracker
