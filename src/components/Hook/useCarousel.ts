import { useCallback, useEffect, useRef, useState } from 'react'

export const useCarousel = (action: any, delay: number) => {
  const [running, setRunning] = useState(false)
  const savedAction = useRef(action)
  const stop = useCallback(() => setRunning(false), [setRunning])
  const play = useCallback(() => setRunning(true), [setRunning])

  useEffect(() => {
    savedAction.current = action
  }, [action])

  useEffect(() => {
    if (!running) {
      return
    }

    let instance = 0
    const tick = () => {
      if (!running) {
        return clearTimeout(instance)
      }

      savedAction.current()

      // @ts-ignore
      requestAnimationFrame(() => (instance = setTimeout(tick, delay)))
    }

    // @ts-ignore
    requestAnimationFrame(() => (instance = setTimeout(tick, delay)))

    return () => {
      if (instance) clearTimeout(instance)
      stop()
    }
  }, [running, stop, delay])

  return { play, stop }
}
