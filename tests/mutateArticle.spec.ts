import { expect, test } from '@playwright/test'
import _random from 'lodash/random'

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

test.describe('Mutate article', () => {
  authedTest(
    "Alice's article is appreciation by Bob, and received notification",
    async ({ alicePage, bobPage, isMobile }) => {
      // [Alice] create and publish new article
      await publishDraft({ page: alicePage, isMobile })

      // [Alice] Get new article link
      const aliceArticleLink = alicePage.url()

      // [Bob] Go to Alice's article page
      await pageGoto(bobPage, aliceArticleLink)

      const bobArticleDetail = new ArticleDetailPage(bobPage)

      const title = await bobArticleDetail.getTitle()

      const amount = _random(1, 5, false)

      // [Bob] appreciation
      await bobArticleDetail.sendAppreciation(amount)

      // [Alice] Go to notifications page
      const aliceNotifications = new NotificationsPage(alicePage)
      await alicePage.waitForTimeout(5 * 1000)
      await aliceNotifications.goto()

      // [Alice] Expect it has "liked your article" notice
      const noticeReceiveArtileTitle = await alicePage
        .getByTestId(TEST_ID.NOTICE_ARTICLE_NEW_APPRECIATION)
        .first()
        .getByTestId(TEST_ID.NOTICE_ARTICLE_TITLE)
        .first()
        .innerText({
          // FIXME: notifications page is slow to fetch data since it's no-cache
          timeout: 15e3,
        })
      expect(stripSpaces(noticeReceiveArtileTitle)).toBe(stripSpaces(title))

      // [Alice] Check Appreciation count
      await alicePage
        .getByTestId(TEST_ID.NOTICE_ARTICLE_NEW_APPRECIATION)
        .first()
        .getByTestId(TEST_ID.NOTICE_ARTICLE_TITLE)
        .first()
        .click()
      const aliceAppreciationAmount = await alicePage
        .getByTestId(TEST_ID.ARTICLE_APPRECIATION_TOTAL)
        .innerText()
      expect(aliceAppreciationAmount).toBe(amount.toString())
    }
  )

  authedTest(
    "Alice's article is bookmarked by Bob",
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
      const aliceArticleDetail = new ArticleDetailPage(bobPage)

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
    "Alice's article is forked by Bob",
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
      const aliceArticleDetail = new ArticleDetailPage(bobPage)
      const aliceTitle = await aliceArticleDetail.getTitle()

      await aliceArticleDetail.forkArticle()

      // [Bob] create and publish article
      const draftDetail = new DraftDetailPage(bobPage, isMobile)

      // Required: Fill title and content
      const title = await draftDetail.fillTitle()
      const content = await draftDetail.fillContent(title)
      await draftDetail.publish()

      // Goto published article page
      // Promise.all prevents a race condition between clicking and waiting.
      await Promise.all([
        bobPage.waitForNavigation(),
        draftDetail.dialogViewArticleButton.click(),
      ])

      const bobArticleDetail = new ArticleDetailPage(bobPage)
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

    // clean pinned works
    if (
      await alicePage.getByTestId(TEST_ID.USER_PROFILE_PIN_BOARD).isVisible()
    ) {
      const unpinButtons = alicePage.getByTestId(
        TEST_ID.USER_PROFILE_PIN_BOARD_UNPIN_BUTTON
      )
      const count = await unpinButtons.count()
      for (let i = 0; i < count; ++i) {
        await Promise.all([
          waitForAPIResponse({
            page: alicePage,
            path: 'data.editArticle.pinned',
            isOK: (data) => data === false,
          }),
          unpinButtons.nth(0).click(),
        ])
      }

      await alicePage.getByTestId(TEST_ID.USER_PROFILE_PIN_BOARD).isHidden()
    }

    // [Alice] Get first article
    const aliceArticles = await aliceProfile.feedArticles.all()
    const firstArticle = await aliceArticles[0].first()
    await expect(firstArticle).toBeVisible()
    const firstArticleTitle = await firstArticle
      .getByTestId(TEST_ID.DIGEST_ARTICLE_TITLE)
      .innerText()

    await firstArticle.getByRole('button', { name: 'More Actions' }).click()
    while (
      !(await alicePage
        .getByRole('menuitem', { name: 'Pin to profile' })
        .isVisible())
    ) {
      await firstArticle.getByRole('button', { name: 'More Actions' }).click()
    }

    await Promise.all([
      waitForAPIResponse({
        page: alicePage,
        path: 'data.editArticle.pinned',
        isOK: (data) => data === true,
      }),
      alicePage
        .getByRole('menuitem', { name: 'Pin to profile' })
        .locator('div')
        .click(),
    ])

    await expect(
      alicePage.getByTestId(TEST_ID.USER_PROFILE_PIN_BOARD)
    ).toBeVisible()
    const firstPinnedWork = await alicePage
      .getByTestId(TEST_ID.USER_PROFILE_PIN_BOARD_PINNED_WORK)
      .first()
    const firstBookTitle = await firstPinnedWork
      .getByTestId(TEST_ID.BOOK_TITLE)
      .innerText()
    expect(stripSpaces(firstBookTitle)).toBe(stripSpaces(firstArticleTitle))

    // unpin
    const unpinButton = firstPinnedWork.getByTestId(
      TEST_ID.USER_PROFILE_PIN_BOARD_UNPIN_BUTTON
    )
    await Promise.all([
      waitForAPIResponse({
        page: alicePage,
        path: 'data.editArticle.pinned',
        isOK: (data) => data === false,
      }),
      unpinButton.click(),
    ])

    await alicePage.getByTestId(TEST_ID.USER_PROFILE_PIN_BOARD).isHidden()
  })

  authedTest('revise article', async ({ alicePage, isMobile }) => {
    // [Alice] create and publish new article
    const article = await publishDraft({ page: alicePage, isMobile })

    const aliceArticleDetail = new ArticleDetailPage(alicePage)
    // revise article
    await aliceArticleDetail.editArticle()

    const draftDetail = new DraftDetailPage(alicePage, isMobile)
    await draftDetail.dialogEditButton.click()
    const newContent = 'revise article ' + article.content
    await draftDetail.contentInput.fill(newContent)
    await draftDetail.rePublish()

    // Goto republished article page
    await draftDetail.dialogViewRepublishedArticle.click()
    await alicePage.waitForLoadState('networkidle')
    const articleContent = await aliceArticleDetail.content.innerText()
    expect(stripSpaces(articleContent)).toBe(stripSpaces(newContent))
  })

  authedTest(
    'Disable response and allow response article',
    async ({ alicePage, bobPage, isMobile }) => {
      // [Alice] create and publish new article with disable response
      const article = await publishDraft({
        page: alicePage,
        isMobile,
        allowResponse: false,
      })

      // [Alice] Get new article link
      const aliceArticleLink = alicePage.url()

      // [Bob] Go to Alice's article page
      await pageGoto(bobPage, aliceArticleLink)

      const bobArticleDetail = new ArticleDetailPage(bobPage)

      // Confirm that the comment area is not clickable
      await expect(bobArticleDetail.toolbarCommentButton).toBeDisabled()

      // [Alice] Allow respsonses on just published articles
      await pageGoto(alicePage, aliceArticleLink)
      const aliceArticleDetail = new ArticleDetailPage(alicePage)
      // revise article
      await aliceArticleDetail.editArticle()
      const draftDetail = new DraftDetailPage(alicePage, isMobile)
      await draftDetail.dialogEditButton.click()
      const newContent = 'revise article ' + article.content
      await draftDetail.contentInput.fill(newContent)
      await draftDetail.checkResponse({ allow: true })
      await draftDetail.rePublish()

      // [Alice] Get new article link
      const allowResponseArticleLink = alicePage.url()
      // [Bob] Go to Alice's article page
      await pageGoto(bobPage, allowResponseArticleLink)
      const allowResponseArticleDetail = new ArticleDetailPage(bobPage)

      // [Bob] Send a comment
      const commentContent = await allowResponseArticleDetail.sendComment()

      // [Bob] Expect article detail shows this comment
      await expect(bobPage.getByText(commentContent).first()).toBeVisible()

      // [Alice] Confirm that response setting area is unclickable
      await pageGoto(alicePage, aliceArticleLink)
      const aliceAlloResponseArticleDetail = new ArticleDetailPage(alicePage)
      await aliceAlloResponseArticleDetail.editArticle()
      const allowResponseDraftDetail = new DraftDetailPage(alicePage, isMobile)
      await allowResponseDraftDetail.dialogEditButton.click()
      if (isMobile) {
        await allowResponseDraftDetail.bottombarManage.click()
      }
      await expect(allowResponseDraftDetail.barResponsesAllow).toBeDisabled()
      await expect(allowResponseDraftDetail.barResponsesDisallow).toBeDisabled()
    }
  )
})
