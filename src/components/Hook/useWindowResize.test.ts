import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { WINDOW_RESIZE_DEBOUNCE } from '~/common/enums'
import { act, renderHook } from '~/common/utils/test'

import { useWindowResize } from './useWindowResize'

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

describe('components/Hook/useWindowResize', () => {
  it('should return default size when window is not resized', () => {
    const { result } = renderHook(() => useWindowResize([100, 100]))
    expect(result.current).toEqual([100, 100])
  })

  it('should update size when window is resized', () => {
    const { result } = renderHook(() => useWindowResize())
    act(() => {
      // Mock window resize event
      window.innerWidth = 500
      window.innerHeight = 500
      window.dispatchEvent(new Event('resize'))
    })
    // Debounce time needs to be waited out
    vi.advanceTimersByTime(WINDOW_RESIZE_DEBOUNCE)
    expect(result.current).toEqual([500, 500])
  })

  it('should clean up on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')
    const { unmount } = renderHook(() => useWindowResize())
    unmount()
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'resize',
      expect.any(Function)
    )
  })
})
