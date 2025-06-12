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

  // identify views from browser or pwa
  const detectMode = () => {
    const navigator = window?.navigator
    const media = '(display-mode: standalone)'
    return (navigator as Navigator & { standalone?: boolean })?.standalone ||
      window?.matchMedia(media).matches
      ? 'standalone'
      : 'browser'
  }

  // first load
  useEffect(() => {
    // add time out to wait for analytic listener to be ready
    setTimeout(() => {
      const mode = detectMode()
      analytics.identifyUser()
      analytics.trackPage('page_view', { mode })
    }, 1000)

    referrer.current = getPageReferrer() // window.location.origin + window.location.pathname
  }, [])

  // subsequent changes
  useEffect(() => {
    const trackPage = () => {
      const mode = detectMode()
      analytics.trackPage('page_view', {
        page_referrer: referrer.current,
        mode,
      })
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
