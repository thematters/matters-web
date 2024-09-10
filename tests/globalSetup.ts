// global-setup.ts
import { chromium, FullConfig } from '@playwright/test'

import { login, User, users } from './helpers'

const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.2227.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.3497.92 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
]

const prepareUserStorageState = async (baseURL: string, user: User) => {
  const browser = await chromium.launch()
  const page = await browser.newPage({
    baseURL,
    userAgent: USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)],
  })
  page.addInitScript(
    "Object.defineProperty(navigator, 'webdriver', {get: () => undefined})"
  )

  // login to user
  await login({
    email: user.email,
    password: user.password,
    page,
    target: '/login', // redirect to login page to save some API requests
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
    userAgent: USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)],
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
