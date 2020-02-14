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

type Width = number | undefined
type Height = number | undefined
type Size = [Width, Height]

const getSize = (): Size => {
  if (typeof window === undefined) {
    return [undefined, undefined]
  }

  return [window.innerWidth, window.innerHeight]
}

export const useWindowResize = () => {
  const [size, setSize] = useState<Size>([undefined, undefined])
  const resize = _debounce(() => setSize(getSize()), WINDOW_RESIZE_DEBOUNCE)

  useEffect(() => {
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  return size
}
