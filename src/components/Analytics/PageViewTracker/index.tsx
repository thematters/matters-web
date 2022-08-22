import { useRouter } from 'next/router'
import { useContext, useEffect, useRef } from 'react'

import { ViewerContext } from '~/components'

import { analytics } from '~/common/utils'

// get referrer without query string
// should be same as window.location.origin + window.location.pathname
function getPageReferrer(url: string = window.location.href) {
  return url.split('?')?.[0] || url
}

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
    }, 1000)

    referrer.current = getPageReferrer() // window.location.pathname
  }, [viewer.privateFetched])

  // subsequent changes
  useEffect(() => {
    const trackPage = () => {
      if (!viewer.privateFetched) {
        return
      }

      analytics.trackPage('page_view', { page_referrer: referrer.current })
      referrer.current = getPageReferrer() // window.location.pathname
    }

    router.events.on('routeChangeComplete', trackPage)

    return () => {
      router.events.off('routeChangeComplete', trackPage)
    }
  }, [viewer.privateFetched])

  return null
}

export default PageViewTracker
