import { useEffect } from 'react'

import { useEventListener } from '~/components'

export const ClientUpdater = () => {
  const visualViewport =
    typeof window !== 'undefined' ? window.visualViewport : undefined

  const upadteVVH = () => {
    if (!visualViewport) {
      return
    }

    const vvh = (visualViewport.height || 0) / 100 + 'px'
    document.documentElement.style.setProperty('--vvh', vvh)
  }
  useEventListener(
    'resize',
    () => {
      upadteVVH()
    },
    visualViewport
  )

  useEffect(() => {
    upadteVVH()
  }, [])

  return null
}
