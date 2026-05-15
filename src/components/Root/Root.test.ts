import { describe, expect, it } from 'vitest'

import { ROOT_QUERY_PRIVATE_VARIABLES } from './variables'

describe('Root', () => {
  it('requests viewer OSS feature flags for Community Watch permissions', () => {
    expect(ROOT_QUERY_PRIVATE_VARIABLES.includeViewerOss).toBe(true)
  })
})
