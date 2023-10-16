import { useEffect, useState } from 'react'

import { leftPad } from '~/common/utils'

import { useInterval } from './useInterval'

const formatTimeLeft = (diff: number) => {
  const mins = Math.floor((diff / (60 * 1000)) * 1)
  const secs = Math.floor(((diff % (60 * 1000)) / 1000) * 1)
  return { mins, secs }
}

interface UseCountdownProps {
  timeLeft: number
  step?: number
}

// TODO: Will remove after New Social Login Release
export const useLegacyCountdown = ({
  timeLeft,
  step = 1000,
}: UseCountdownProps) => {
  const [countdown, setCountdown] = useState({ timeLeft, step })
  const formatted = formatTimeLeft(countdown.timeLeft)

  useInterval(() => {
    if (countdown.timeLeft > 0) {
      setCountdown({
        ...countdown,
        timeLeft: Math.max(countdown.timeLeft - 1000, 0),
      })
    }

    if (timeLeft < 0) {
      setCountdown({
        ...countdown,
        timeLeft: 0,
      })
    }
  }, countdown.step)

  return {
    countdown,
    setCountdown: (props: UseCountdownProps) =>
      setCountdown({
        timeLeft: props.timeLeft,
        step: props.step || countdown.step,
      }),
    formattedTimeLeft: {
      mmss: `${leftPad(formatted.mins, 2, 0)}:${leftPad(formatted.secs, 2, 0)}`,
      ss: `${leftPad(formatted.secs, 2, 0)}`,
    },
  }
}

export const useCountdown = (initValue: number) => {
  const [countdown, setCountdown] = useState(initValue)

  useEffect(() => {
    countdown > 0 && setTimeout(() => setCountdown(countdown - 1), 1000)
  }, [countdown])

  return { countdown, setCountdown }
}
