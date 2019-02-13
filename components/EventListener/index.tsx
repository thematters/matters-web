import { SFC, useEffect } from 'react'

export const EventListener: SFC<{
  event: string
  children: SFC<CustomEvent>
  target?: any
}> = ({ children, event, target = window }) => {
  const onEvent = (evt: CustomEvent) => children(evt)

  useEffect(() => {
    target.addEventListener(event, onEvent)

    return () => {
      target.removeEventListener(event, onEvent)
    }
  })

  return null
}
