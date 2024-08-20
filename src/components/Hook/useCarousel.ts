import { useCallback, useEffect, useRef, useState } from 'react'

export const useCarousel = (action: () => void, delay: number) => {
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

    let instance: ReturnType<typeof setTimeout>
    const tick = () => {
      if (!running) {
        return clearTimeout(instance)
      }

      savedAction.current()

      requestAnimationFrame(() => (instance = setTimeout(tick, delay)))
    }

    requestAnimationFrame(() => (instance = setTimeout(tick, delay)))

    return () => {
      if (instance) clearTimeout(instance)
      stop()
    }
  }, [running, stop, delay])

  return { play, stop }
}
