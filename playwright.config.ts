import { devices, type PlaywrightTestConfig } from '@playwright/test'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, './', '.env.local') })

const LOCALE = 'en-US'
const isCI = process.env.PLAYWRIGHT_RUNTIME_ENV === 'ci'
// const isLocal = process.env.PLAYWRIGHT_RUNTIME_ENV === 'local'

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: './tests',
  outputDir: 'test-results/',
  timeout: 150e3,
  expect: {
    timeout: 200e3,
  },
  fullyParallel: true,
  forbidOnly: !!isCI,
  retries: isCI ? 2 : 1,
  workers: isCI ? 2 : undefined,
  // maxFailures: process.env.CI ? 2 : 0,
  reporter: 'html',
  globalSetup: require.resolve('./tests/globalSetup'),
  use: {
    testIdAttribute: 'data-test-id',
    actionTimeout: 0,
    baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'Chromium',
      use: {
        ...devices['Desktop Chrome'],
        locale: LOCALE,
      },
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
}

export default config
