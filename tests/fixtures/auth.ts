import { test as baseTest } from '@playwright/test'
import fs from 'fs'
import path from 'path'

import { login } from '../utils'
export { expect } from '@playwright/test'

const users = [
  {
    email: process.env.PLAYWRIGHT_AUTH_EMAIL_1 as string,
    password: process.env.PLAYWRIGHT_AUTH_PWD_1 as string,
  },
  {
    email: process.env.PLAYWRIGHT_AUTH_EMAIL_2 as string,
    password: process.env.PLAYWRIGHT_AUTH_PWD_2 as string,
  },
]

export const authedTest = baseTest.extend({
  storageState: async ({ browser }, use, testInfo) => {
    // Override storage state, use worker index to look up logged-in info and generate it lazily.
    const fileName = path.join(
      testInfo.project.outputDir,
      'storage-' + testInfo.workerIndex
    )
    if (!fs.existsSync(fileName)) {
      // Make sure we are not using any other storage state.
      const page = await browser.newPage({ storageState: undefined })

      // Login
      await login({
        email: users[testInfo.workerIndex].email,
        password: users[testInfo.workerIndex].password,
        page,
      })

      await page.context().storageState({ path: fileName })
      await page.close()
    }
    await use(fileName)
  },
})
