import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { useDialogSwitch } from './useDialogSwitch'

describe('components/Hook/useDialogSwitch', () => {
  it('should initialize with the provided value', () => {
    const { result } = renderHook(() => useDialogSwitch(true))
    expect(result.current.show).toBe(true)
  })

  it('should set show to true when openDialog is called', () => {
    const { result } = renderHook(() => useDialogSwitch(false))
    act(() => {
      result.current.openDialog()
    })
    expect(result.current.show).toBe(true)
  })

  it('should set show to false when closeDialog is called', () => {
    const { result } = renderHook(() => useDialogSwitch(true))
    act(() => {
      result.current.closeDialog()
    })
    expect(result.current.show).toBe(false)
  })

  it('should set show to the provided value when setShow is called', () => {
    const { result } = renderHook(() => useDialogSwitch(false))
    act(() => {
      result.current.setShow(true)
    })
    expect(result.current.show).toBe(true)
  })
})
