import { useEffect, useRef } from 'react'
import { useIntl } from 'react-intl'

import { useRoute } from './useRoute'

export const useUnloadConfirm = ({
  block,
  hint,
}: {
  block: boolean
  hint?: string
}) => {
  const blockRef = useRef<boolean>(false)
  const { router } = useRoute()
  const intl = useIntl()

  hint =
    hint ||
    intl.formatMessage({
      defaultMessage: 'Saving draft, are you sure you want to leave?',
      id: 'LWE7oq',
    })

  const onRouteChange = () => {
    if (!blockRef.current) {
      return null
    }

    if (window.confirm(hint)) {
      return true
    }

    throw "Abort route change by user's confirmation."
  }

  const onBeforeUnload = (event: Event) => {
    if (!blockRef.current) {
      return null
    }

    // legacy browsers
    if (event) {
      event.returnValue = !!hint
    }

    // modern browsers (ignore text)
    return hint
  }

  useEffect(() => {
    window.addEventListener('beforeunload', onBeforeUnload)
    router.events.on('routeChangeStart', onRouteChange)

    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload)
      router.events.off('routeChangeStart', onRouteChange)
    }
  }, [])

  useEffect(() => {
    blockRef.current = block
  }, [block])
}
