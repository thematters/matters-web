import { act, renderHook } from '@testing-library/react'
import mockRouter from 'next-router-mock'
import { beforeEach, describe, expect, it } from 'vitest'

import { PATHS } from '~/common/enums'

import { useRoute } from './useRoute'

beforeEach(() => {
  mockRouter.push(PATHS.ABOUT + '?name=foo&email=test%2Babc%40matters.news')
})

describe('components/Hook/useRoute', () => {
  it('should return true when path starts with given string', () => {
    const { result } = renderHook(() => useRoute())
    expect(result.current.isPathStartWith(PATHS.ABOUT)).toBe(true)
    expect(result.current.isPathStartWith('/not-start')).toBe(false)
  })

  it('should return true when path is equal to given string', () => {
    const { result } = renderHook(() => useRoute())
    expect(result.current.isInPath('ABOUT')).toBe(true)
    expect(result.current.isInPath('COMMUNITY')).toBe(false)
  })

  it('should return query value by key', () => {
    const { result } = renderHook(() => useRoute())
    expect(result.current.getQuery('name')).toBe('foo')
    expect(result.current.getQuery('email')).toBe('test+abc@matters.news')
    expect(result.current.getQuery('mediaHash')).toBe('')
  })

  it('should set query value by key', () => {
    const { result } = renderHook(() => useRoute())
    act(() => result.current.setQuery('name', 'bar'))
    expect(result.current.getQuery('name')).toBe('bar')
  })

  it('should replace query value by key', () => {
    const { result } = renderHook(() => useRoute())
    act(() => result.current.replaceQuery('name', 'bar'))
    expect(result.current.getQuery('name')).toBe('bar')
  })
})
