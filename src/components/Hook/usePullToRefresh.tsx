import { useEffect } from 'react'
import ReactDOMServer from 'react-dom/server'

import { ReactComponent as IconPullToRefresh } from '@/public/static/icons/24px/pull-to-refresh.svg'
import { analytics, sleep } from '~/common/utils'
import { IconSpinner16, withIcon } from '~/components'

import { useEventListener } from './useEventListener'

/**
 * Core of Pull to Refresh
 *
 * Usage:
 *
 * ```tsx
 * usePullToRefresh.Register()
 * usePullToRefresh.Handler(refetch)
 * ```
 *
 */

const PTR_START = 'startPullToRefresh'
const PTR_END = 'endPullToRefresh'
const PTR_TIMEOUT = 3000

/**
 * React Hook to register Pull To Refresh
 */
const Register = (selector = 'body', timeout = PTR_TIMEOUT) => {
  let PTR: any

  const initPTR = (ptr: any) => {
    PTR = ptr

    PTR.init({
      mainElement: selector,
      triggerElement: selector,
      distReload: 56,
      onRefresh: (cb: () => void) => {
        // start refresh
        window.dispatchEvent(new CustomEvent(PTR_START, {}))
        analytics.trackEvent('pull_to_refresh')

        // end refresh
        let polling = true

        const onEnd = () => {
          if (polling) {
            cb()
            polling = false
          }
          window.removeEventListener(PTR_END, onEnd)
        }

        window.addEventListener(PTR_END, onEnd)
        sleep(timeout).then(onEnd)
      },
      getStyles: () => ``, // remove default styles
      iconArrow: ReactDOMServer.renderToString(
        withIcon(IconPullToRefresh)({ size: 'md' })
      ),
      iconRefreshing: ReactDOMServer.renderToString(
        <IconSpinner16 size="md" />
      ),
    })
  }

  useEffect(() => {
    import('pulltorefreshjs').then(initPTR)

    return () => {
      if (PTR) {
        PTR.destroyAll()
      }
    }
  }, [])
}

/**
 * React Hook to handle `PTR_START` event from `usePullToRefresh.Register`
 */
const Handler = (onPull: () => any) => {
  useEventListener(PTR_START, async () => {
    if (onPull) {
      await onPull()
    }

    window.dispatchEvent(new CustomEvent(PTR_END, {}))
  })
}

export const usePullToRefresh = {
  Register,
  Handler,
}
