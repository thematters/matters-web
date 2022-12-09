// global-setup.ts
import { chromium, FullConfig } from '@playwright/test'

import { login, User, users } from './helpers'

const prepareUserStorageState = async (baseURL: string, user: User) => {
  const browser = await chromium.launch()
  const page = await browser.newPage({ baseURL })

  // login to user
  await login({
    email: user.email,
    password: user.password,
    page,
    target: '/login', // redirect to login page to save some API requests
  })

  // Save signed-in state to storageState
  await page
    .context()
    .storageState({ path: `test-results/storageState-${user.email}.json` })
  await browser.close()
}

async function globalSetup(config: FullConfig) {
  // read `baseURL` from `playwright.config.ts`
  const { baseURL } = config.projects[0].use

  // prepare users storages
  await prepareUserStorageState(baseURL as string, users.alice)
  await prepareUserStorageState(baseURL as string, users.bob)
}

export default globalSetup
