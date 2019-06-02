import { useEffect } from 'react'

import { dom } from '~/common/utils'

export const useImmersiveMode = (hookSelector?: string) => {
  let lastKnownScrollY = 0
  let currentScrollY = 0
  let ticking = false
  let topOffset = 0

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
    if (currentScrollY < lastKnownScrollY) {
      document.documentElement.classList.remove('immersive-mode')
    } else if (
      currentScrollY > lastKnownScrollY &&
      currentScrollY > topOffset
    ) {
      document.documentElement.classList.add('immersive-mode')
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
