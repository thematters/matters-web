import { useEffect } from 'react'

/**
 * This hook is for listening native events, such as MouseEvent. Recommend you
 * to specify toggle to make sure component is mounted and reduce unnecessary
 * listerner.
 *
 * Usage:
 *
 * ```jsx
 *   useNativeEventListener('keydown', keyDownHandler, this.state.toggle)
 * ```
 *
 */

export function useNativeEventListener(
  event: string,
  action: any,
  element?: any
) {
  const eventAction = (eventInstance: Event) => action(eventInstance)

  useEffect(() => {
    const target = element || window
    if (!target) {
      return
    }

    target.addEventListener(event, eventAction)

    return () => {
      target.removeEventListener(event, eventAction)
    }
  })
}
