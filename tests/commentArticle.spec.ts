import { expect, test } from '@playwright/test'

import { TEST_ID } from '~/common/enums'
import { stripSpaces } from '~/common/utils/text'

import {
  ArticleDetailPage,
  authedTest,
  NotificationsPage,
  pageGoto,
  sleep,
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
      await sleep(10e3) // have a 10s delay to send notification from backend
      const aliceNotifications = new NotificationsPage(alicePage)
      await aliceNotifications.goto()

      // [Alice] Expect it has "article new comment" notice
      const noticeArticleNewCommentContent = await alicePage
        .getByTestId(TEST_ID.NOTICE_ARTICLE_NEW_COMMENT)
        .first()
        .getByTestId(TEST_ID.NOTICE_COMMENT_CONTENT)
        .first()
        .innerText({
          // FIXME: notifications page is slow to fetch data since it's no-cache
          timeout: 15e3,
        })
      expect(stripSpaces(noticeArticleNewCommentContent)).toBe(
        stripSpaces(commentContent)
      )
    }
  )
})
