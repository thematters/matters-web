import { expect, test } from '@playwright/test'

import { TEST_ID } from '~/common/enums'
import { sleep } from '~/common/utils/time'

import {
  ArticleDetailPage,
  authedTest,
  login,
  logout,
  pageGoto,
  UserProfilePage,
  users,
} from './helpers'

test.describe('Switch between multiple users', () => {
  authedTest('Same context', async ({ alicePage: page, isMobile }) => {
    test.skip(!!isMobile, 'Desktop only!')
    await pageGoto(page, '/')
    let i = 0
    let articleLink
    while (true) {
      articleLink = (await page
        .getByTestId(TEST_ID.DIGEST_ARTICLE_FEED)
        .nth(i)
        .getByTestId(TEST_ID.DIGEST_ARTICLE_TITLE)
        .getAttribute('href')) as string
      expect(articleLink).toBeTruthy()

      await pageGoto(page, articleLink)
      await sleep(3 * 1000)
      // Confirm that the comment area is clickable
      const articleDetail = new ArticleDetailPage(page, isMobile)
      if (await articleDetail.toolbarCommentButton.isEnabled()) {
        break
      }
      i += 1
      await page.goBack()
    }

    // [Alice] Logout
    await logout({ page })

    // [Bob] Login
    await login({
      email: users.bob.email,
      password: users.bob.password,
      page,
      target: articleLink,
    })
    await page.waitForLoadState('networkidle')

    const articleDetail = new ArticleDetailPage(page, isMobile)
    // [Bob] Send a comment
    await sleep(3 * 1000)
    await articleDetail.sendComment()

    // [Bob] Get display name and user name in first comment
    const firstComment = await page
      .getByTestId(TEST_ID.ARTICLE_COMMENT_FEED)
      .first()
    const displayName = await firstComment
      .getByTestId(TEST_ID.DIGEST_USER_MINI_DISPLAY_NAME)
      .first()
      .innerText()
    const userName = await firstComment
      .getByTestId(TEST_ID.DIGEST_USER_MINI_USER_NAME)
      .first()
      .innerText()

    // [Bob] Get display name and user name
    const bobProfile = new UserProfilePage(page, isMobile)
    await bobProfile.gotoMeProfile()
    const profileDisplayName = await bobProfile.displayName.innerText()
    const profileUserName = await bobProfile.userName.innerText()

    expect(displayName).toBe(profileDisplayName)
    expect(userName).toBe(profileUserName)
  })

  test('Different Context', async ({ browser, isMobile }) => {
    test.skip(!!isMobile, 'Desktop only!')
    const aliceContext = await browser.newContext()
    const bobContext = await browser.newContext()

    const alicePage = await aliceContext.newPage()
    const bobPage = await bobContext.newPage()

    await pageGoto(alicePage, '/')
    let i = 0
    let articleLink
    while (true) {
      articleLink = (await alicePage
        .getByTestId(TEST_ID.DIGEST_ARTICLE_FEED)
        .nth(i)
        .getByTestId(TEST_ID.DIGEST_ARTICLE_TITLE)
        .getAttribute('href')) as string
      expect(articleLink).toBeTruthy()

      await pageGoto(alicePage, articleLink)
      await sleep(3 * 1000)
      // Confirm that the comment area is clickable
      const articleDetail = new ArticleDetailPage(alicePage, isMobile)
      if (await articleDetail.toolbarCommentButton.isEnabled()) {
        await pageGoto(alicePage, '/')
        break
      }
      i += 1
      await alicePage.goBack()
    }

    // [Alice] login
    await login({
      email: users.alice.email,
      password: users.alice.password,
      page: alicePage,
      target: articleLink,
    })

    await sleep(3 * 1000)
    // [Alice] Logout
    await logout({ page: alicePage })

    // [Bob] login
    await login({
      email: users.bob.email,
      password: users.bob.password,
      page: bobPage,
      target: articleLink,
    })
    await bobPage.waitForLoadState('networkidle')

    const articleDetail = new ArticleDetailPage(bobPage, isMobile)
    // [Bob] Send a comment
    await sleep(3 * 1000)
    await articleDetail.sendComment()

    // [Bob] Get display name and user name in first comment
    const firstComment = await bobPage
      .getByTestId(TEST_ID.ARTICLE_COMMENT_FEED)
      .first()
    const displayName = await firstComment
      .getByTestId(TEST_ID.DIGEST_USER_MINI_DISPLAY_NAME)
      .first()
      .innerText()
    const userName = await firstComment
      .getByTestId(TEST_ID.DIGEST_USER_MINI_USER_NAME)
      .first()
      .innerText()

    // [Bob] Get display name and user name
    const bobProfile = new UserProfilePage(bobPage, isMobile)
    await bobProfile.gotoMeProfile()
    const profileDisplayName = await bobProfile.displayName.innerText()
    const profileUserName = await bobProfile.userName.innerText()

    expect(displayName).toBe(profileDisplayName)
    expect(userName).toBe(profileUserName)
  })
})
