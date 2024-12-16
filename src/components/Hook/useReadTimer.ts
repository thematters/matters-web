import _throttle from 'lodash/throttle'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'

import { analytics } from '~/common/utils'

type Props = {
  articleId: string
  container?: React.RefObject<HTMLDivElement>
}

export const useReadTimer = ({ articleId, container }: Props) => {
  const router = useRouter()

  //in ms
  const interval = 5000

  const dummy = useRef(0)
  const readTimer = useRef(0)
  const lastScroll = useRef(Date.now() / 1000)

  useEffect(() => {
    const handleScroll = _throttle(() => {
      lastScroll.current = Date.now() / 1000
    }, 3000)

    const storeReadTime = () => {
      if (articleId && readTimer)
        analytics.trackEvent('read_time', {
          articleId,
          time: readTimer.current,
        })
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('beforeunload', storeReadTime)
    router.events.on('routeChangeStart', storeReadTime)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('beforeunload', storeReadTime)
      router.events.off('routeChangeStart', storeReadTime)
    }
  }, [])

  // reading timer
  useEffect(() => {
    const timerId = setInterval(
      (function heartbeat() {
        const isReading = () => {
          // tab hidden
          if (document.hidden) {
            return false
          }

          // content not rendered
          if (!container || !container.current) {
            return false
          }

          // idle for more than 3 minutes
          if (Date.now() / 1000 - lastScroll.current > 60 * 3) {
            return false
          }

          // if overlay is shown
          const overlaySelectors = ['reach-portal', '.tippy-popper']
          if (document.querySelector(overlaySelectors.join(','))) {
            return false
          }

          // if drawer is opened
          if (document.querySelector('[id^="Drawer__"].open')) {
            return false
          }

          // if bottom is above center
          const { bottom } = (
            container.current as unknown as Element
          ).getBoundingClientRect()

          const isBottom = bottom <= window.innerHeight * 0.8
          return !isBottom
        }

        // don't count the first time
        if (dummy.current === 0) {
          dummy.current = 1
          return heartbeat
        }

        if (isReading()) {
          readTimer.current = readTimer.current + interval
        }
        return heartbeat
      })(),
      interval
    )

    return () => {
      clearInterval(timerId)
    }
  }, [])
}
