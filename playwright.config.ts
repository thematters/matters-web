import { defineConfig, devices } from '@playwright/test'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, './', '.env.local') })

const LOCALE = 'en-US'
const isCI = process.env.PLAYWRIGHT_RUNTIME_ENV === 'ci'
// const isLocal = process.env.PLAYWRIGHT_RUNTIME_ENV === 'local'

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config = defineConfig({
  testDir: 'tests',
  testIgnore: ['mutateArticle.spec.ts'],
  outputDir: 'test-results/',
  timeout: 60e3,
  expect: {
    timeout: 20e3,
  },
  fullyParallel: isCI ? false : true,
  forbidOnly: !!isCI,
  retries: isCI ? 3 : 1,
  workers: isCI ? 1 : undefined,
  maxFailures: process.env.CI ? 1 : 0,
  reporter: 'html',
  use: {
    testIdAttribute: 'data-test-id',
    actionTimeout: 0,
    baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL,
    trace: isCI ? 'on-first-retry' : 'on',
  },
  projects: [
    {
      name: 'setup',
      use: {
        ...devices['Desktop Chrome'],
        locale: LOCALE,
      },
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: 'Chromium',
      use: {
        ...devices['Desktop Chrome'],
        locale: LOCALE,
      },
      dependencies: ['setup'],
    },
  ],
})

export default config
