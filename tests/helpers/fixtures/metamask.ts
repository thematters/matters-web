import {
  type BrowserContext,
  chromium,
  Page,
  test as baseTest,
} from '@playwright/test'
import {
  activateCustomNonce,
  goToAdvancedSettings,
  initialSetup,
  // @ts-ignore
} from '@synthetixio/synpress/commands/metamask'
// @ts-ignore
import { prepareMetamask } from '@synthetixio/synpress/helpers'
import { polygonMumbai } from '@wagmi/core/chains'

import { users } from '../auth'
import { loadUserStorageState } from './auth'

export const metamskTest = baseTest.extend<{
  context: BrowserContext
  bobPage: Page
}>({
  context: async ({}, use) => {
    // required for synpress
    // @ts-ignore
    global.expect = expect
    // download metamask
    const metamaskPath = await prepareMetamask(
      process.env.PLAYWRIGHT_METAMASK_VERSION || '10.25.0'
    )
    // prepare browser args
    const browserArgs = [
      `--disable-extensions-except=${metamaskPath}`,
      `--load-extension=${metamaskPath}`,
      '--remote-debugging-port=9222',
    ]
    if (process.env.PLAYWRIGHT_RUNTIME_ENV === 'ci') {
      browserArgs.push('--disable-gpu')
    }
    if (process.env.HEADLESS_MODE) {
      browserArgs.push('--headless=new')
    }
    // launch browser
    const context = await chromium.launchPersistentContext('', {
      headless: false,
      args: browserArgs,
    })
    // wait for metamask
    await context.pages()[0].waitForTimeout(3000)
    // setup metamask
    await initialSetup(chromium, {
      secretWordsOrPrivateKey: process.env.PLAYWRIGHT_METAMASK_SECRET_WORD,
      network: {
        networkName: polygonMumbai.name,
        rpcUrl: polygonMumbai.rpcUrls.default,
        chainId: polygonMumbai.id,
        symbol: polygonMumbai.nativeCurrency.symbol,
        isTestnet: polygonMumbai.testnet,
      },
      password: process.env.PLAYWRIGHT_METAMASK_PASSWORD,
      enableAdvancedSettings: false,
    })
    await goToAdvancedSettings()
    await activateCustomNonce(false)
    await use(context)
    await context.close()
  },
  bobPage: async ({ browser }, use) => {
    await use(await loadUserStorageState(users.bob, browser))
  },
})
export const expect = baseTest.expect
