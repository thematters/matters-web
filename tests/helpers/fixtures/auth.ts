import { Browser, Page, test as baseTest } from '@playwright/test'

import { User, users } from '../auth'

type AuthFixtures = {
  alicePage: Page
  bobPage: Page
}

export const loadUserStorageState = async (user: User, browser: Browser) => {
  const context = await browser.newContext({
    storageState: `test-storage-state/storageState-${user.email}.json`,
  })
  const page = await context.newPage()
  return page
}

export const authedTest = baseTest.extend<AuthFixtures>({
  alicePage: async ({ browser }, use) => {
    await use(await loadUserStorageState(users.alice, browser))
  },
  bobPage: async ({ browser }, use) => {
    await use(await loadUserStorageState(users.bob, browser))
  },
})
