import { useEffect } from 'react'

export function useEventListener(
  event: string,
  action: (detail: CustomEvent['detail']) => void,
  element?: EventTarget | VisualViewport | null
) {
  useEffect(() => {
    const target = element || window
    if (!target) {
      return
    }
    const eventAction = (event: Event) => action((event as CustomEvent).detail)
    target.addEventListener(event, eventAction)

    return () => {
      target.removeEventListener(event, eventAction)
    }
  })
}
