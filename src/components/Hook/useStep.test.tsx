import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { useStep } from './useStep'

describe('components/Hook/useStep', () => {
  it('should initialize with default step', () => {
    const { result } = renderHook(() => useStep('Step1'))
    expect(result.current.currStep).toBe('Step1')
    expect(result.current.prevStep).toBeUndefined()
  })

  it('should go forward to next step', () => {
    const { result } = renderHook(() => useStep('Step1'))
    act(() => {
      result.current.forward('Step2')
    })
    expect(result.current.currStep).toBe('Step2')
    expect(result.current.prevStep).toBe('Step1')
  })

  it('should go back to previous step', () => {
    const { result } = renderHook(() => useStep('Step1'))

    act(() => {
      result.current.forward('Step2')
    })

    act(() => {
      result.current.back()
    })

    expect(result.current.currStep).toBe('Step1')
    expect(result.current.prevStep).toBeUndefined()
  })

  it('should reset to a specific step', () => {
    const { result } = renderHook(() => useStep('Step1'))

    act(() => {
      result.current.forward('Step2')
    })

    act(() => {
      result.current.reset('Step3')
    })

    expect(result.current.currStep).toBe('Step3')
    expect(result.current.prevStep).toBeUndefined()
  })
})
