import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { act, renderHook } from '~/common/utils/test'

import { useCountdown } from './useCountdown'

beforeEach(() => {
  // Tests should run in serial for improved isolation
  // To prevent collision with global state, reset all toasts for each test
  vi.useFakeTimers()
})

afterEach(() => {
  act(() => {
    vi.runAllTimers()
    vi.useRealTimers()
  })
})

const waitTime = (time: number) => {
  act(() => {
    vi.advanceTimersByTime(time)
  })
}

describe('components/Hook/useCountdown', () => {
  it('should count down', async () => {
    const { result } = renderHook(() => useCountdown(10))

    waitTime(1000)
    expect(result.current.countdown).toEqual(9)

    waitTime(1000)
    expect(result.current.countdown).toEqual(8)
  })

  it('should stop at 0', async () => {
    const { result } = renderHook(() => useCountdown(1))

    waitTime(1000)
    expect(result.current.countdown).toEqual(0)

    waitTime(1000)
    expect(result.current.countdown).toEqual(0)
  })

  it('should reset', async () => {
    const { result } = renderHook(() => useCountdown(10))

    waitTime(1000)
    expect(result.current.countdown).toEqual(9)

    act(() => {
      result.current.setCountdown(10)
    })
    expect(result.current.countdown).toEqual(10)

    waitTime(1000)
    expect(result.current.countdown).toEqual(9)
  })
})
