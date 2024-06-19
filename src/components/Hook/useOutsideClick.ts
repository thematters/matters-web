import { useEffect } from 'react'

export const useOutsideClick = <T extends Event>(
  node: React.RefObject<HTMLElement>,
  action: (event: T) => void
) => {
  useEffect(() => {
    if (!action) {
      return
    }

    const listener = (event: T) => {
      if (!node.current || node.current.contains(event.target as Node)) {
        return
      }
      action(event)
    }
    document.addEventListener('mousedown', listener as EventListener)
    document.addEventListener('touchstart', listener as EventListener)

    return () => {
      document.removeEventListener('mousedown', listener as EventListener)
      document.removeEventListener('touchstart', listener as EventListener)
    }
  }, [node, action])
}
