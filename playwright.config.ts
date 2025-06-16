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
    // ...(isLocal
    //   ? []
    //   : [
    //       {
    //         name: 'firefox',
    //         use: {
    //           ...devices['Desktop Firefox'],
    //           locale: LOCALE,
    //         },
    //       },
    //       // {
    //       //   name: 'webkit',
    //       //   use: {
    //       //     ...devices['Desktop Safari'],
    //       //     locale: LOCALE,
    //       //   },
    //       // },
    //     ]),

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: {
    //     ...devices['Pixel 5'],
    //     locale: LOCALE,
    //   },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: {
    //     ...devices['iPhone 12'],
    //     locale: LOCALE,
    //   },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: {
    //     channel: 'msedge',
    //   },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: {
    //     channel: 'chrome',
    //   },
    // },
  ],
})

export default config
