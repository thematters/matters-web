import { expect, test } from '@playwright/test'
import _random from 'lodash/random'

import { TEST_ID } from '~/common/enums'
import { stripSpaces } from '~/common/utils/text'

import {
  ArticleDetailPage,
  authedTest,
  NotificationsPage,
  UserProfilePage,
} from './helpers'
import { users } from './helpers/auth'

test.describe('Support article', () => {
  authedTest(
    "Alice' article is supported with HKD by Bob, and received notification",
    async ({ alicePage, bobPage, isMobile }) => {
      // [Alice] Go to profile page
      const aliceProfile = new UserProfilePage(alicePage, isMobile)
      await aliceProfile.gotoMeProfile()

      // [Alice] Get first article
      const aliceArticleLink = (await aliceProfile.feedArticles
        .first()
        .getByTestId(TEST_ID.DIGEST_ARTICLE_TITLE)
        .getAttribute('href')) as string
      expect(aliceArticleLink).toBeTruthy()

      // [Bob] Go to Alice's article page
      await bobPage.goto(aliceArticleLink)
      const aliceArticleDetail = new ArticleDetailPage(bobPage, isMobile)

      const amount = _random(1, 50, false)

      // [Bob] Support HKD
      await aliceArticleDetail.supportHKD(users.bob.paymentPassword, amount)

      // [Bob] Expect support detail shows View transaction history
      await expect(
        bobPage.getByRole('link', { name: 'Transaction History' })
      ).toBeVisible()

      // [Bob] Check Transactions History
      await bobPage.getByRole('link', { name: 'Transaction History' }).click()
      const bobTransactionItemAmount = await bobPage
        .getByTestId(TEST_ID.ME_WALLET_TRANSACTIONS_ITEM)
        .first()
        .getByTestId(TEST_ID.ME_WALLET_TRANSACTIONS_ITEM_AMOUNT)
        .first()
        .innerText()
      expect(stripSpaces(bobTransactionItemAmount)).toBe(
        stripSpaces(`- HKD ${parseFloat(amount.toString()).toFixed(2)}`)
      )

      // [Alice] Go to notifications page
      const aliceNotifications = new NotificationsPage(alicePage)
      await aliceNotifications.goto()

      // [Alice] Expect it has "article new donation" notice
      const noticeReceiveDonationAmount = await alicePage
        .getByTestId(TEST_ID.PAYMENT_RECEIVE_DONATION)
        .first()
        .getByTestId(TEST_ID.PAYMENT_RECEIVE_DONATION_AMOUNT)
        .first()
        .innerText({
          // FIXME: notifications page is slow to fetch data since it's no-cache
          timeout: 15e3,
        })
      expect(stripSpaces(noticeReceiveDonationAmount)).toBe(
        stripSpaces(`${amount} HKD`)
      )

      // [Alice] Check Transactions History
      await alicePage.goto('/me/wallet/transactions')
      const aliceTransactionItemAmount = await alicePage
        .getByTestId(TEST_ID.ME_WALLET_TRANSACTIONS_ITEM)
        .first()
        .getByTestId(TEST_ID.ME_WALLET_TRANSACTIONS_ITEM_AMOUNT)
        .first()
        .innerText()
      expect(stripSpaces(aliceTransactionItemAmount)).toBe(
        stripSpaces(`+ HKD ${parseFloat(amount.toString()).toFixed(2)}`)
      )
    }
  )
})
