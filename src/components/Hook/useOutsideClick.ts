import { useEffect } from 'react'

export const useOutsideClick = (
  node: React.RefObject<HTMLElement>,
  action: any
) => {
  useEffect(() => {
    if (!action) {
      return
    }

    const listener = (event: any) => {
      if (!node.current || node.current.contains(event.target as Node)) {
        return
      }
      action(event)
    }
    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [node, action])
}
