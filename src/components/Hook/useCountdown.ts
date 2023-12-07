import { useEffect, useState } from 'react'

export const useCountdown = (initValue: number) => {
  const [countdown, setCountdown] = useState(initValue)

  useEffect(() => {
    countdown > 0 && setTimeout(() => setCountdown(countdown - 1), 1000)
  }, [countdown])

  return { countdown, setCountdown }
}
