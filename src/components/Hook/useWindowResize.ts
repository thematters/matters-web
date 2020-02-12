import _debounce from 'lodash/debounce'
import { useEffect, useState } from 'react'

import { WINDOW_RESIZE_DEBOUNCE } from '~/common/enums'

/**
 * This hook is for subscribing window resize event, and get the
 * width and height of current winow in an array.
 *
 * Usage:
 *
 * ```jsx
 * const [width, height] = useWindowResize()
 * ```
 */

const getSize = () => [
  window?.innerWidth || undefined,
  window?.innerHeight || undefined
]

export const useWindowResize = () => {
  const [size, setSize] = useState(getSize())

  useEffect(() => {
    if (!window) {
      return
    }
    const resize = _debounce(() => setSize(getSize()), WINDOW_RESIZE_DEBOUNCE)
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  return size
}
