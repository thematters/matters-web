import { expect, test } from '@playwright/test'
import _random from 'lodash/random'

import { TEST_ID } from '~/common/enums'
import { stripSpaces } from '~/common/utils/text'

import { publishDraft } from './common'
import { ArticleDetailPage, authedTest, NotificationsPage } from './helpers'

test.describe('Mutate article', () => {
  authedTest(
    "Alice' article is appreciation by Bob, and received notification",
    async ({ alicePage, bobPage, isMobile, request }) => {
      // [Alice] create and publish new article
      await publishDraft({ page: alicePage, isMobile })

      // const mediaHashState = await request.post(
      //   'https://server-develop.matters.news/graphql',
      //   {
      //     data: {
      //       variables: {},
      //       query:
      //         '{\n  node(input: {id: "QXJ0aWNsZTo5MDI2"}) {\n    ... on Article {\n      id\n      mediaHash\n    }\n  }\n}\n',
      //     },
      //   }
      // )
      // console.log({ mediaHashState })

      // [Alice] Get new article link
      const aliceArticleLink = alicePage.url()

      // [Bob] Go to Alice's article page
      await bobPage.goto(aliceArticleLink)

      const bobArticleDetail = new ArticleDetailPage(bobPage, isMobile)

      while (true) {
        const appreciationButtonState =
          await bobArticleDetail.toolbarAppreciationButton.getAttribute(
            'disabled'
          )
        if (appreciationButtonState === null) break
        await new Promise((r) => setTimeout(r, 5 * 1000))
        await bobPage.reload()
      }

      const title = await bobArticleDetail.getTitle()

      const amount = _random(1, 5, false)

      // [Bob] appreciation
      await bobArticleDetail.sendAppreciation(amount)

      // [Alice] Go to notifications page
      const aliceNotifications = new NotificationsPage(alicePage)
      await aliceNotifications.goto()

      // [Alice] Expect it has "liked your article" notice
      const noticeReceiveArtileTitle = await alicePage
        .getByTestId(TEST_ID.ARTICLE_NEW_APPRECIATION)
        .first()
        .getByTestId(TEST_ID.DIGEST_ARTICLE_TITLE)
        .first()
        .innerText({
          // FIXME: notifications page is slow to fetch data since it's no-cache
          timeout: 15e3,
        })
      expect(stripSpaces(noticeReceiveArtileTitle)).toBe(stripSpaces(title))

      // [Alice] Check Appreciation count
      await alicePage
        .getByTestId(TEST_ID.ARTICLE_NEW_APPRECIATION)
        .first()
        .getByTestId(TEST_ID.DIGEST_ARTICLE_TITLE)
        .first()
        .click()
      const aliceAppreciationAmount = await alicePage
        .getByTestId(TEST_ID.ARTICLE_APPRECIATION_TOTAL)
        .innerText()
      expect(aliceAppreciationAmount).toBe(amount.toString())
    }
  )
})
