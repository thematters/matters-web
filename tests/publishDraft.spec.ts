import { test } from '@playwright/test'

import { publishDraft } from './common'
import { authedTest } from './helpers'

test.describe('Publish draft', () => {
  // Other tests have covered this test
  authedTest.skip(
    'can create and publish draft',
    async ({ alicePage: page, isMobile }) => {
      await publishDraft({ page, isMobile })
    }
  )
})
