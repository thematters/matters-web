import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'

import { analytics } from '~/common/utils'

// get referrer without query string
// should be same as window.location.origin + window.location.pathname
function getPageReferrer(url: string = window.location.href) {
  return url.split('?')?.[0] || url
}

const PageViewTracker = () => {
  const router = useRouter()
  const referrer = useRef('')

  // first load
  useEffect(() => {
    // add time out to wait for analytic listener to be ready
    setTimeout(() => {
      analytics.identifyUser()
      analytics.trackPage()
    }, 1000)

    referrer.current = getPageReferrer() // window.location.origin + window.location.pathname
  }, [])

  // subsequent changes
  useEffect(() => {
    const trackPage = () => {
      analytics.trackPage('page_view', { page_referrer: referrer.current })
      referrer.current = getPageReferrer() // window.location.origin + window.location.pathname
    }

    router.events.on('routeChangeComplete', trackPage)

    return () => {
      router.events.off('routeChangeComplete', trackPage)
    }
  }, [])

  return null
}

export default PageViewTracker
