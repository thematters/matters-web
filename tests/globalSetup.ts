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
  })

  // Save signed-in state to storageState
  await page.context().storageState({
    path: `test-storage-state/storageState-${user.email}.json`,
  })
  await browser.close()
}

const setupEnglish = async (baseURL: string, user: User) => {
  const browser = await chromium.launch()

  const context = await browser.newContext({
    storageState: `test-storage-state/storageState-${user.email}.json`,
  })
  const request = context.request
  await request.post(process.env.PLAYWRIGHT_TEST_API_URL as string, {
    data: {
      variables: { input: { language: 'en' } },
      query: `mutation UpdateLanguage($input: UpdateUserInfoInput!) {
        updateUserInfo(input: $input) {
          id
          settings {
            language
          }
        }
      }`,
    },
  })
}

async function globalSetup(config: FullConfig) {
  // read `baseURL` from `playwright.config.ts`
  const { baseURL } = config.projects[0].use

  // prepare users storages
  await prepareUserStorageState(baseURL as string, users.alice)
  await prepareUserStorageState(baseURL as string, users.bob)

  await setupEnglish(baseURL as string, users.alice)
  await setupEnglish(baseURL as string, users.bob)
}

export default globalSetup
