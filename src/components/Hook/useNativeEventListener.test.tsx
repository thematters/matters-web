import { fireEvent } from '@testing-library/react'
import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { useNativeEventListener } from './useNativeEventListener'

describe('components/Hook/useNativeEventListener', () => {
  it('adds an event listener to the window object when the component is mounted', () => {
    const action = vi.fn()
    renderHook(() => {
      useNativeEventListener('click', action)
    })

    fireEvent.click(window)
    expect(action).toHaveBeenCalled()
  })

  it('removes the event listener from the window object when the component is unmounted', () => {
    const action = vi.fn()
    const { unmount } = renderHook(() => {
      useNativeEventListener('click', action)
    })

    unmount()

    fireEvent.click(window)
    expect(action).not.toHaveBeenCalled()
  })
})
