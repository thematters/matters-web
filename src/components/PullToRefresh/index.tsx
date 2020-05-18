import { useEffect } from 'react'
import ReactDOMServer from 'react-dom/server'

import { Icon, withIcon } from '~/components'

import { PTR_END, PTR_START } from '~/common/enums'
import { sleep } from '~/common/utils'

import { ReactComponent as IconPullToRefresh } from '@/public/static/icons/pull-to-refresh.svg'

const PTR_TIMEOUT = 5000

const PullToRefresh = () => {
  let PTR: any

  const initPTR = (ptr: any) => {
    PTR = ptr

    PTR.init({
      mainElement: 'body',
      distReload: 48,
      onRefresh: (cb: () => void) => {
        // start refresh
        window.dispatchEvent(new CustomEvent(PTR_START, {}))

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
        sleep(PTR_TIMEOUT).then(onEnd)
      },
      getStyles: () => ``, // remove default styles
      iconArrow: ReactDOMServer.renderToString(
        withIcon(IconPullToRefresh)({ size: 'md' })
      ),
      iconRefreshing: ReactDOMServer.renderToString(<Icon.Spinner size="md" />),
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

  return null
}

export default PullToRefresh
