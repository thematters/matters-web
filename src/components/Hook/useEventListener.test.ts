import { describe, expect, it, vi } from 'vitest'

import { fireEvent, renderHook } from '~/common/utils/test'

import { useEventListener } from './useEventListener'

describe('components/Hook/useEventListener', () => {
  it('adds an event listener to a custom element when the component is mounted', () => {
    const action = vi.fn()
    const element = document.createElement('div')
    renderHook(() => {
      useEventListener('click', action, element)
    })

    fireEvent.click(element)
    expect(action).toHaveBeenCalled()
  })

  it('removes the event listener from a custom element when the component is unmounted', () => {
    const action = vi.fn()
    const element = document.createElement('div')
    const { unmount } = renderHook(() => {
      useEventListener('click', action, element)
    })

    unmount()

    fireEvent.click(element)
    expect(action).not.toHaveBeenCalled()
  })

  it('passes the event detail to the action when the event is triggered', () => {
    const action = vi.fn()
    const detail = { data: 'test' }
    renderHook(() => {
      useEventListener('custom', action)
    })

    fireEvent(window, new CustomEvent('custom', { detail }))
    expect(action).toHaveBeenCalledWith(detail)
  })
})
