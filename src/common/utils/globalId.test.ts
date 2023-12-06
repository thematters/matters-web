import { Base64 } from 'js-base64'
import { describe, expect, it } from 'vitest'

import { fromGlobalId, toGlobalId } from './globalId'

describe('utils/globalId/toGlobalId', () => {
  it('should encode the type and id correctly', () => {
    const result = toGlobalId({ type: 'User', id: '123' })
    expect(result).toBe(Base64.encodeURI('User:123'))
  })
})

describe('utils/globalId/fromGlobalId', () => {
  it('should decode the globalId correctly', () => {
    const globalId = Base64.encodeURI('User:123')
    const result = fromGlobalId(globalId)
    expect(result).toEqual({ type: 'User', id: '123' })
  })
})
