import { SFC, useEffect } from 'react'

interface Event {
  detail: { type: string; [key: string]: any }
}

export const EventListener: SFC<{
  event: string
  children: SFC<Event>
  target?: any
}> = ({ children, event, target = window }) => {
  const onEvent = (evt: Event) => children(evt)

  useEffect(() => {
    target.addEventListener(event, onEvent)

    return () => {
      target.removeEventListener(event, onEvent)
    }
  })

  return null
}
