import { useRouter } from 'next/router'
import { useContext, useEffect, useRef } from 'react'

import { ViewerContext } from '~/components'

import { analytics } from '~/common/utils'

const PageViewTracker = () => {
  const router = useRouter()
  const viewer = useContext(ViewerContext)
  const referrer = useRef('')

  // first load
  useEffect(() => {
    if (!viewer.privateFetched) {
      return
    }

    // add time out to wait for analytic listener to be ready
    setTimeout(() => {
      analytics.identifyUser()
      analytics.trackPage()
    }, 3000)

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

    router.events.on('routeChangeComplete', trackPage)

    return () => {
      router.events.off('routeChangeComplete', trackPage)
    }
  }, [viewer.privateFetched])

  return null
}

export default PageViewTracker
