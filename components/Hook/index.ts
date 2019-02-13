import { useEffect } from 'react'

export function useEventListener(event: string, action: any, element?: any) {
  useEffect(() => {
    const target = element || window
    if (!target) {
      return undefined
    }
    const eventAction = ({ detail }) => action(detail)
    target.addEventListener(event, eventAction)
    return () => {
      target.removeEventListener(event, eventAction)
    }
  })
}
