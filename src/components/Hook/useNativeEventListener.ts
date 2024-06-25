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

export function useNativeEventListener<T extends Event>(
  event: string,
  action: (evt: T) => void,
  element?: EventTarget
) {
  const eventAction = (eventInstance: T) => action(eventInstance)

  useEffect(() => {
    const target = element || window
    if (!target) {
      return
    }

    target.addEventListener(event, eventAction as EventListener) // TSC is not smart enough here to know yet

    return () => {
      target.removeEventListener(event, eventAction as EventListener)
    }
  })
}
