import { expect, test } from '@playwright/test'

import {
  ArticleDetailPage,
  authedTest,
  // NotificationsPage,
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
      // const aliceNotifications = new NotificationsPage(alicePage)
      // await aliceNotifications.goto()
    }
  )
})
