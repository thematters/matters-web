import { expect, test } from '@playwright/test'
// @ts-ignore
import * as metamask from '@synthetixio/synpress/commands/metamask'
import _random from 'lodash/random'

import { TEST_ID } from '~/common/enums'
import { stripSpaces } from '~/common/utils/text'
import { sleep } from '~/common/utils/time'

import {
  ArticleDetailPage,
  metamskTest,
  NotificationsPage,
  pageGoto,
  UserProfilePage,
} from './helpers'

test.describe('web3 test', async () => {
  metamskTest(
    'login with wallet and support article with usdt',
    async ({ page: alicePage, bobPage, isMobile }) => {
      if (isMobile) {
        test.skip()
      }

      // [Alice] import account
      if (
        metamask.walletAddress().toLowerCase() !==
        String(process.env.PLAYWRIGHT_WALLET_ADDRESS_ALICE).toLowerCase()
      ) {
        await metamask.importAccount(process.env.PLAYWRIGHT_PRIVATE_KEY_ALICE)
      }

      await pageGoto(alicePage, '/')

      // Expect homepage has "Enter" button
      const enterButton = alicePage.getByRole('button', { name: 'Enter' })
      await expect(enterButton).toBeVisible()

      await enterButton.click()

      await alicePage
        .getByRole('button', {
          name: 'Continue with Wallet For unregistered or users enabled wallet login',
        })
        .click()
      await alicePage.getByRole('button', { name: 'MetaMask' }).click()
      await metamask.acceptAccess()
      await alicePage.getByRole('button', { name: 'Next' }).click()
      await metamask.confirmSignatureRequest()
      await alicePage.waitForLoadState('networkidle')

      // Expect homepage has "Notification" button on the left side
      await expect(
        alicePage.getByRole('link', { name: 'Notifications' })
      ).toBeVisible()

      // [bob] Get first article
      const bobProfile = new UserProfilePage(bobPage)
      await bobProfile.gotoMeProfile()
      const bobArticleLink = (await bobProfile.feedArticles
        .first()
        .getByTestId(TEST_ID.DIGEST_ARTICLE_TITLE)
        .getAttribute('href')) as string
      expect(bobArticleLink).toBeTruthy()

      // [Alice] Go to bob's article page
      await pageGoto(alicePage, bobArticleLink)
      const bobArticleDetail = new ArticleDetailPage(alicePage, isMobile)

      // Open support dialog
      await bobArticleDetail.supportButton.click()
      await alicePage.waitForLoadState('networkidle')

      // Connect Wallet
      await bobArticleDetail.dialog
        .getByRole('button', { name: 'Connect Wallet' })
        .click()
      await bobArticleDetail.dialog
        .getByRole('button', { name: 'MetaMask' })
        .click()
      await metamask.acceptAccess()

      await bobArticleDetail.dialog
        .getByRole('button', { name: 'Tether' })
        .click()

      const amount = _random(0.01, 0.05, true).toFixed(2)
      await bobArticleDetail.dialog
        .getByPlaceholder('Enter a custom amount')
        .fill(amount.toString())

      // click next step
      await bobArticleDetail.dialog
        .getByRole('button', { name: 'Next' })
        .click()

      await bobArticleDetail.dialog
        .getByRole('button', { name: 'Confirm' })
        .click()
      await metamask.confirmTransaction()

      // [Alice] Expect support detail shows View transaction history
      await expect(
        alicePage.getByRole('link', { name: 'Transaction History' })
      ).toBeVisible()

      // [Alice] Check Transactions History
      await alicePage.getByRole('link', { name: 'Transaction History' }).click()
      const aliceTransactionItemAmount = await alicePage
        .getByTestId(TEST_ID.ME_WALLET_TRANSACTIONS_ITEM)
        .first()
        .getByTestId(TEST_ID.ME_WALLET_TRANSACTIONS_ITEM_AMOUNT)
        .first()
        .innerText()
      expect(stripSpaces(aliceTransactionItemAmount)).toBe(
        stripSpaces(`- USDT ${amount}`)
      )

      // [Bob] Go to notifications page
      await sleep(10 * 1000)
      const bobNotifications = new NotificationsPage(bobPage)
      await bobNotifications.goto()

      // [Bob] Expect it has "article new donation" notice
      const noticeReceiveDonationAmount = await bobPage
        .getByTestId(TEST_ID.NOTICE_PAYMENT_RECEIVE_DONATION)
        .first()
        .getByTestId(TEST_ID.NOTICE_PAYMENT_RECEIVE_DONATION_AMOUNT)
        .first()
        .innerText({
          // FIXME: notifications page is slow to fetch data since it's no-cache
          timeout: 15e3,
        })
      expect(stripSpaces(noticeReceiveDonationAmount)).toBe(
        stripSpaces(`${amount} USDT`)
      )
    }
  )
})
