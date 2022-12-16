import { expect, test } from '@playwright/test'

import { TEST_ID } from '~/common/enums'
import { stripSpaces } from '~/common/utils'

import {
  ArticleDetailPage,
  authedTest,
  NotificationsPage,
  UserProfilePage,
} from './helpers'

test.describe('Comment to article', () => {
  authedTest(
    "Alice' article is commented by Bob, and received notification",
    async ({ alicePage, bobPage }) => {
      // [Alice] Go to profile page
      const aliceProfile = new UserProfilePage(alicePage)
      await aliceProfile.gotoMeProfile()

      // [Alice] Get first article
      const aliceArticleLink = (await aliceProfile.feedArticles
        .first()
        .getByRole('link')
        .first()
        .getAttribute('href')) as string
      expect(aliceArticleLink).toBeTruthy()

      // [Bob] Go to Alice's article page
      await bobPage.goto(aliceArticleLink)
      const aliceArticleDetail = new ArticleDetailPage(bobPage)

      // [Bob] Send a comment
      const commentContent = await aliceArticleDetail.sendComment()

      // [Bob] Expect article detail shows this comment
      await expect(bobPage.getByText(commentContent)).toBeVisible()

      // [Alice] Go to notifications page
      const aliceNotifications = new NotificationsPage(alicePage)
      await aliceNotifications.goto()

      // [Alice] Expect it has "article new comment" notice
      const noticeArticleNewCommentContent = await alicePage
        .getByTestId(TEST_ID.ARTICLE_NEW_COMMENT)
        .first()
        .getByTestId(TEST_ID.COMMENT_CONETNT)
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
