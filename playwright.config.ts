import { devices, type PlaywrightTestConfig } from '@playwright/test'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, './', '.env.local') })

const LOCALE = 'en-US'
const isCI = process.env.PLAYWRIGHT_RUNTIME_ENV === 'ci'
const isLocal = process.env.PLAYWRIGHT_RUNTIME_ENV === 'local'

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: './tests',
  outputDir: 'test-results/',
  timeout: 30 * 1000,
  expect: {
    timeout: 3000,
  },
  fullyParallel: true,
  forbidOnly: !!isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 2 : undefined,
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
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        locale: LOCALE,
      },
    },
    ...(isLocal
      ? []
      : [
          {
            name: 'firefox',
            use: {
              ...devices['Desktop Firefox'],
              locale: LOCALE,
            },
          },

          {
            name: 'webkit',
            use: {
              ...devices['Desktop Safari'],
              locale: LOCALE,
            },
          },
        ]),

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: {
    //     ...devices['Pixel 5'],
    //   },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: {
    //     ...devices['iPhone 12'],
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
