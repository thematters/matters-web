import { useEffect, useState } from 'react'

export const useInView = (ref: React.RefObject<HTMLElement>) => {
  const [isIntersecting, setIntersecting] = useState(false)

  const observer = new IntersectionObserver(([entry]) =>
    setIntersecting(entry.isIntersecting)
  )

  useEffect(() => {
    if (ref.current) {
      observer.observe(ref.current)
      // Remove the observer as soon as the component is unmounted
      return () => {
        observer.disconnect()
      }
    }
  }, [])

  return isIntersecting
}
