import { expect, test } from '@playwright/test'
import _random from 'lodash/random'

import { sleep } from '@/src/common/utils/time'
import { TEST_ID } from '~/common/enums'
import { stripSpaces } from '~/common/utils/text'

import { publishDraft } from './common'
import {
  ArticleDetailPage,
  authedTest,
  DraftDetailPage,
  NotificationsPage,
  pageGoto,
  UserProfilePage,
  waitForAPIResponse,
} from './helpers'

test.describe.only('Mutate article', () => {
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
      // console.log(await mediaHashState.json())

      // [Alice] Get new article link
      const aliceArticleLink = alicePage.url()

      // [Bob] Go to Alice's article page
      await pageGoto(bobPage, aliceArticleLink)

      const bobArticleDetail = new ArticleDetailPage(bobPage, isMobile)

      while (true) {
        const appreciationButtonState =
          await bobArticleDetail.toolbarAppreciationButton.getAttribute(
            'disabled'
          )
        if (appreciationButtonState === null) break
        await sleep(5 * 1000)
        await bobPage.reload()
        await bobPage.waitForLoadState('networkidle')
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

  authedTest(
    "Alice' article is bookmarked by Bob",
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
      await pageGoto(bobPage, aliceArticleLink)
      const aliceArticleDetail = new ArticleDetailPage(bobPage, isMobile)

      const firstLabel =
        await aliceArticleDetail.toolbarBookmarkButton.getAttribute(
          'aria-label'
        )
      // [Bob] bookmark
      await aliceArticleDetail.sendBookmark()
      const secondLabel =
        await aliceArticleDetail.toolbarBookmarkButton.getAttribute(
          'aria-label'
        )

      expect(firstLabel !== secondLabel).toBeTruthy()
    }
  )

  authedTest(
    "Alice' article is forked by Bob",
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
      await pageGoto(bobPage, aliceArticleLink)
      const aliceArticleDetail = new ArticleDetailPage(bobPage, isMobile)
      const aliceTitle = await aliceArticleDetail.getTitle()

      await aliceArticleDetail.forkArticle()

      // [Bob] create and publish article
      const draftDetail = new DraftDetailPage(bobPage, isMobile)
      // Required: Fill title and content
      const title = await draftDetail.fillTitle()
      const content = await draftDetail.fillContent()
      await draftDetail.publish()

      // Goto published article page
      // Promise.all prevents a race condition between clicking and waiting.
      await Promise.all([
        bobPage.waitForNavigation(),
        draftDetail.dialogViewArticleButton.click(),
      ])

      const bobArticleDetail = new ArticleDetailPage(bobPage, isMobile)
      const bobTitle = await bobArticleDetail.getTitle()
      expect(stripSpaces(bobTitle)).toBe(stripSpaces(title))

      const bobContent = await bobArticleDetail.content.innerText()
      expect(stripSpaces(bobContent)).toBe(stripSpaces(content))

      const firstCollectionArticleTitle =
        await bobArticleDetail.getFirstCollectionArticleTitle()
      expect(stripSpaces(firstCollectionArticleTitle)).toBe(
        stripSpaces(aliceTitle)
      )
    }
  )

  authedTest('Pin and unpin article', async ({ alicePage, isMobile }) => {
    // [Alice] Go to profile page
    const aliceProfile = new UserProfilePage(alicePage, isMobile)
    await aliceProfile.gotoMeProfile()

    // [Alice] Get first article
    const aliceArticles = await aliceProfile.feedArticles.all()
    const secondArticle = await aliceArticles[1].first()
    await expect(secondArticle).toBeVisible()
    const secondArticleTitle = await secondArticle
      .getByTestId(TEST_ID.DIGEST_ARTICLE_TITLE)
      .innerText()

    await secondArticle.getByRole('button', { name: 'More Actions' }).click()
    const pinButton = await alicePage
      .getByRole('menuitem', { name: 'Article pinned' })
      .locator('section')
    await Promise.all([
      waitForAPIResponse({
        page: alicePage,
        path: 'data.editArticle.sticky',
        isOK: (data) => data === true,
      }),
      pinButton.click(),
    ])

    const firstArticle = await aliceProfile.feedArticles.first()
    const firstArticleTitle = await firstArticle
      .getByTestId(TEST_ID.DIGEST_ARTICLE_TITLE)
      .innerText()
    expect(stripSpaces(firstArticleTitle)).toBe(stripSpaces(secondArticleTitle))
    const footerPin = firstArticle.getByTestId(
      TEST_ID.DIGEST_ARTICLE_FEED_FOOTER_PIN
    )
    await expect(footerPin).toBeVisible()

    // unpin
    await firstArticle.getByRole('button', { name: 'More Actions' }).click()
    const unpinButton = await alicePage
      .getByRole('menuitem', { name: 'Unpin' })
      .locator('section')
    await Promise.all([
      waitForAPIResponse({
        page: alicePage,
        path: 'data.editArticle.sticky',
        isOK: (data) => data === false,
      }),
      unpinButton.click(),
    ])
    const firstArticleAfterUnpin = await aliceProfile.feedArticles.first()
    const firstArticleTitleAfterUnpin = await firstArticleAfterUnpin
      .getByTestId(TEST_ID.DIGEST_ARTICLE_TITLE)
      .innerText()
    expect(
      stripSpaces(firstArticleTitle) !==
        stripSpaces(firstArticleTitleAfterUnpin)
    ).toBeTruthy()
  })
})
