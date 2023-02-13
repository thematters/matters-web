import { expect, Page, test } from '@playwright/test'

import { TEST_ID } from '~/common/enums'
import { stripSpaces } from '~/common/utils/text'

import {
  authedTest,
  NotificationsPage,
  UserProfilePage,
  waitForAPIResponse,
} from './helpers'

const follow = async (page: Page) => {
  await Promise.all([
    waitForAPIResponse({
      page: page,
      path: 'data.toggleFollowUser.isFollowee',
      isOK: (value) => value === true,
    }),
    page.getByRole('button', { name: 'Follow', exact: true }).click(),
  ])
}

const unfollow = async (page: Page) => {
  await Promise.all([
    waitForAPIResponse({
      page: page,
      path: 'data.toggleFollowUser.isFollowee',
      isOK: (value) => value === false,
    }),
    page.getByRole('button', { name: 'Followed', exact: true }).click(),
  ])
}

test.describe('User Mutation', () => {
  authedTest(
    'Alice is followed by Bob',
    async ({ alicePage, bobPage, isMobile }) => {
      // [Alice] Go to profile page
      const aliceProfile = new UserProfilePage(alicePage, isMobile)
      await aliceProfile.gotoMeProfile()

      // [Bob] Go to profile page
      const bobProfile = new UserProfilePage(bobPage, isMobile)
      await bobProfile.gotoMeProfile()
      const bobDisplayName = await bobProfile.displayName.innerText()

      // [Bob] Go to Alice's User Profile
      await bobPage.goto(alicePage.url())

      if (
        await bobPage
          .getByRole('button', { name: 'Followed', exact: true })
          .isVisible()
      ) {
        await unfollow(bobPage)
      }

      await follow(bobPage)

      // [Alice] Go to notifications page
      const aliceNotifications = new NotificationsPage(alicePage)
      await aliceNotifications.goto()

      // [Alice] Expect it has "user new follower" notice
      const noticeUserNewFollowerDisplayName = await alicePage
        .getByTestId(TEST_ID.NOTICE_USER_NEW_FOLLOWER)
        .first()
        .getByTestId(TEST_ID.DIGEST_USER_RICH_DISPLAY_NAME)
        .first()
        .innerText({
          // FIXME: notifications page is slow to fetch data since it's no-cache
          timeout: 15e3,
        })
      expect(stripSpaces(noticeUserNewFollowerDisplayName)).toBe(
        stripSpaces(bobDisplayName)
      )
    }
  )

  authedTest(
    'Alice is unfollowed by Bob',
    async ({ alicePage, bobPage, isMobile }) => {
      // [Alice] Go to profile page
      const aliceProfile = new UserProfilePage(alicePage, isMobile)
      await aliceProfile.gotoMeProfile()

      // [Bob] Go to profile page
      const bobProfile = new UserProfilePage(bobPage, isMobile)
      await bobProfile.gotoMeProfile()

      // [Bob] Go to Alice's User Profile
      await bobPage.goto(alicePage.url())

      if (
        await bobPage
          .getByRole('button', { name: 'Follow', exact: true })
          .isVisible()
      ) {
        await follow(bobPage)
      }

      const followCount = await bobPage
        .getByTestId(TEST_ID.USER_PROFILE_FOLLOWERS_COUNT)
        .innerText()

      await unfollow(bobPage)

      const unfollowCount = await bobPage
        .getByTestId(TEST_ID.USER_PROFILE_FOLLOWERS_COUNT)
        .innerText()

      expect(Number(followCount) === Number(unfollowCount) + 1)
    }
  )
})
