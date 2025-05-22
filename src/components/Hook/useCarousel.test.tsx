import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useCarousel } from './useCarousel'

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

describe('components/Hook/useCarousel', () => {
  it('should call action if playing', async () => {
    const action = vi.fn()
    const delay = 1000
    const lag = 50
    const { result } = renderHook(() => useCarousel(action, delay))

    // start carousel
    act(() => {
      result.current.play()
    })

    waitTime(delay + lag)
    expect(action).toBeCalledTimes(1)

    waitTime(delay + lag)
    expect(action).toBeCalledTimes(2)

    // stop carousel
    act(() => {
      result.current.stop()
    })
    waitTime(delay + lag)
    expect(action).toBeCalledTimes(2)
  })

  it('should not call action if not playing', async () => {
    const action = vi.fn()
    const delay = 1000
    const lag = 50
    renderHook(() => useCarousel(action, delay))

    waitTime(delay + lag)
    expect(action).not.toBeCalledTimes(1)
  })
})
