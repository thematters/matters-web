import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { act } from '~/common/utils/test'

import { deferTry, sleep } from './timer'

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

describe('utils/timer/deferTry', () => {
  it('should retry the function if it throws an error', async () => {
    const fn = vi.fn(() => {
      throw new Error()
    })

    const tries = 3
    const defer = 1000
    deferTry(fn, tries, defer)

    vi.advanceTimersByTime(defer * tries - 1)
    expect(fn).toHaveBeenCalledTimes(tries)
  })

  it('should not retry the function if it does not throw an error', () => {
    const fn = vi.fn()

    const tries = 3
    const defer = 1000
    deferTry(fn, tries, defer)

    expect(fn).toHaveBeenCalledTimes(1)
  })
})

describe('utils/timer/sleep', () => {
  it('should resolve after the specified time', async () => {
    const fn = vi.fn()
    const duration = 1000
    sleep(duration).then(() => {
      fn()
    })
    await vi.advanceTimersByTimeAsync(duration)
    expect(fn).toHaveBeenCalled()
  })
})
