import { useEffect } from 'react'

import { useEventListener } from '~/components'

export const ClientUpdater = () => {
  const visualViewport =
    typeof window !== 'undefined' ? window.visualViewport : undefined
  const innerHeight =
    typeof window !== 'undefined' ? window.innerHeight : undefined

  const upadteVVH = () => {
    if (!visualViewport) {
      return
    }

    const vvh = visualViewport.height / 100 + 'px'
    document.documentElement.style.setProperty('--vvh', vvh)
  }

  const upadteIVH = () => {
    if (!innerHeight) {
      return
    }

    const vvh = innerHeight / 100 + 'px'
    document.documentElement.style.setProperty('--ivh', vvh)
  }

  useEventListener(
    'resize',
    () => {
      upadteIVH()
      upadteVVH()
    },
    visualViewport
  )

  useEffect(() => {
    upadteIVH()
    upadteVVH()
  }, [])

  return null
}
