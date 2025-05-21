import { useEffect } from 'react'

import { useEventListener } from '~/components'

export const ClientUpdater = () => {
  const visualViewport =
    typeof window !== 'undefined' ? window.visualViewport : undefined

  const upadteVVH = () => {
    if (!visualViewport) {
      return
    }

    const vvh = visualViewport.height / 100 + 'px'
    document.documentElement.style.setProperty('--vvh', vvh)
  }

  const upadteIVH = () => {
    const innerHeight =
      typeof window !== 'undefined' ? window.innerHeight : undefined

    if (!innerHeight) {
      return
    }

    const vvh = innerHeight / 100 + 'px'
    document.documentElement.style.setProperty('--ivh', vvh)
  }

  const updatePixelAdjust = () => {
    if (typeof window === 'undefined') {
      return
    }

    const innerWidth = window.innerWidth
    const isOdd = innerWidth % 2 === 1
    document.documentElement.style.setProperty(
      '--pixel-adjust',
      isOdd ? '1px' : '0px'
    )
  }

  useEventListener(
    'resize',
    () => {
      upadteIVH()
      upadteVVH()
      updatePixelAdjust()
    },
    visualViewport
  )

  useEffect(() => {
    upadteIVH()
    upadteVVH()
    updatePixelAdjust()
  }, [])

  return null
}
