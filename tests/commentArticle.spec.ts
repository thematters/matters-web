import { expect, test } from '@playwright/test'

import { TEST_ID } from '~/common/enums'
import { stripSpaces } from '~/common/utils/text'

import {
  ArticleDetailPage,
  authedTest,
  NotificationsPage,
  pageGoto,
  UserProfilePage,
} from './helpers'

test.describe('Comment to article', () => {
  authedTest(
    "Alice's article is commented by Bob, and received notification",
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

      // [Bob] Send a comment
      const commentContent = await aliceArticleDetail.sendComment()

      // [Bob] Expect article detail shows this comment
      await expect(bobPage.getByText(commentContent).first()).toBeVisible()

      // [Alice] Go to notifications page
      const aliceNotifications = new NotificationsPage(alicePage)

      // Poll and refresh until the comment notice with correct content is visible
      let contentMatches = false
      let noticeArticleNewCommentContent = ''

      while (!contentMatches) {
        // Go to notifications page
        await aliceNotifications.goto()

        // Try to find the comment notice
        const noticeVisible = await alicePage
          .getByTestId(TEST_ID.NOTICE_ARTICLE_NEW_COMMENT)
          .first()
          .isVisible({ timeout: 1000 })
          .catch(() => false)

        if (noticeVisible) {
          // Check if the content matches
          noticeArticleNewCommentContent = await alicePage
            .getByTestId(TEST_ID.NOTICE_ARTICLE_NEW_COMMENT)
            .first()
            .getByTestId(TEST_ID.NOTICE_COMMENT_CONTENT)
            .first()
            .innerText()
            .catch(() => '')

          // Check if the content matches what we expect
          contentMatches =
            stripSpaces(noticeArticleNewCommentContent) ===
            stripSpaces(commentContent)
        }

        // Wait before next attempt if not found or content doesn't match
        if (!contentMatches) {
          await alicePage.waitForTimeout(2000)
        }
      }

      // Ensure the notification with correct content was found
      expect(stripSpaces(noticeArticleNewCommentContent)).toBe(
        stripSpaces(commentContent)
      )
    }
  )
})
