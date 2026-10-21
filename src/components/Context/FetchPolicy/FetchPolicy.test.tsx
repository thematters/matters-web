import { act, renderHook } from '@testing-library/react'
import mockRouter from 'next-router-mock'
import { ReactNode } from 'react'
import { describe, expect, it } from 'vitest'

import { FetchPolicyProvider, useFetchPolicy } from './'

const wrapper = ({ children }: { children: ReactNode }) => (
  <FetchPolicyProvider>{children}</FetchPolicyProvider>
)

describe('<FetchPolicy>/useFetchPolicy', () => {
  it('keeps the policy of the current route when it changes mid-route', () => {
    act(() => mockRouter.setCurrentUrl('/featured'))
    const { result } = renderHook(() => useFetchPolicy(), { wrapper })

    expect(result.current.fetchPolicy).toBe('cache-first')

    act(() => {
      result.current.setFetchPolicy('cache-and-network')
    })

    expect(result.current.fetchPolicy).toBe('cache-first')
  })

  it('applies the latest policy after the route changes', () => {
    act(() => mockRouter.setCurrentUrl('/c/foo'))
    const { result, rerender } = renderHook(() => useFetchPolicy(), {
      wrapper,
    })

    act(() => {
      result.current.setFetchPolicy('cache-and-network')
    })
    act(() => {
      mockRouter.setCurrentUrl('/c/bar')
    })
    rerender()

    expect(result.current.fetchPolicy).toBe('cache-and-network')
  })
})
