import { test } from '@playwright/test'

import { publishDraft } from './common'
import { authedTest } from './helpers'

test.describe('Publish draft', () => {
  authedTest(
    'can create and publish draft',
    async ({ alicePage: page, isMobile }) => {
      await publishDraft({ page, isMobile })
    }
  )
})
