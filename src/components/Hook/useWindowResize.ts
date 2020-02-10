import { useEffect, useState } from 'react'

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
    const resize = () => setSize(getSize())
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  return size
}
