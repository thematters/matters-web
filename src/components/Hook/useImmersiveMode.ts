import { useEffect } from 'react'

import { dom } from '~/common/utils'

// create a "sticky" effect on upper and lower anchors
const upperAnchor = 400
const lowerAnchor = -300

export const useImmersiveMode = (hookSelector?: string) => {
  let topOffset = 0
  let previousLocation = 0
  let currentLocation = 0

  let lastKnownScrollY = 0
  let currentScrollY = 0

  let ticking = false

  const onScroll = () => {
    currentScrollY = window.pageYOffset
    requestTick()
  }
  const requestTick = () => {
    if (!ticking) {
      window.requestAnimationFrame(update)
    }
    ticking = true
  }

  const update = () => {
    previousLocation = currentLocation

    const delta = currentScrollY - lastKnownScrollY
    currentLocation =
      currentScrollY > topOffset
        ? delta * previousLocation > 0
          ? previousLocation > 0
            ? upperAnchor
            : lowerAnchor
          : previousLocation + delta
        : lowerAnchor

    if (currentLocation * previousLocation <= 0) {
      if (currentLocation < 0) {
        document.documentElement.classList.remove('immersive-mode')
      } else if (currentLocation > 0) {
        document.documentElement.classList.add('immersive-mode')
      }
    }

    lastKnownScrollY = currentScrollY
    ticking = false
  }

  useEffect(() => {
    window.addEventListener('scroll', onScroll, false)

    const $hook = hookSelector && dom.$(hookSelector)
    if ($hook) {
      topOffset = $hook.offsetTop
    }

    return () => {
      window.removeEventListener('scroll', onScroll)
      document.documentElement.classList.remove('immersive-mode')
    }
  }, [])
}
