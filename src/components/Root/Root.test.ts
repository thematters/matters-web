import { describe, expect, it } from 'vitest'

import { getRootQueryPrivateVariables } from './variables'

describe('Root', () => {
  it('requests viewer OSS feature flags when a user token exists', () => {
    expect(
      getRootQueryPrivateVariables('__dev__access_token=token').includeViewerOss
    ).toBe(true)
  })

  it('skips viewer OSS feature flags for visitors', () => {
    expect(getRootQueryPrivateVariables('').includeViewerOss).toBe(false)
  })
})
