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

  authedTest(
    'Alice is blocked and unblocked by Bob',
    async ({ alicePage, bobPage, isMobile }) => {
      // [Alice] Go to profile page
      const aliceProfile = new UserProfilePage(alicePage, isMobile)
      await aliceProfile.gotoMeProfile()
      const aliceDisplayName = await aliceProfile.displayName.innerText()

      // [Bob] Go to profile page
      const bobProfile = new UserProfilePage(bobPage, isMobile)
      await bobProfile.gotoMeProfile()

      // [Bob] Go to Alice's User Profile
      await bobPage.goto(alicePage.url())

      await bobPage.getByRole('button', { name: 'More Actions' }).click()

      // [Bob] check block state
      if (
        await bobPage
          .getByRole('menuitem', { name: 'Unblock user' })
          .isVisible()
      ) {
        await Promise.all([
          waitForAPIResponse({
            page: bobPage,
            path: 'data.toggleBlockUser.isBlocked',
            isOK: (value) => value === false,
          }),
          bobPage
            .getByRole('menuitem', { name: 'Unblock user' })
            .locator('section')
            .click(),
        ])
        await bobPage.getByRole('button', { name: 'More Actions' }).click()
      }

      await bobPage
        .getByRole('menuitem', { name: 'Block user' })
        .locator('section')
        .click()

      await Promise.all([
        waitForAPIResponse({
          page: bobPage,
          path: 'data.toggleBlockUser.isBlocked',
          isOK: (value) => value === true,
        }),
        bobPage.getByRole('button', { name: 'Block' }).click(),
      ])

      await bobPage.goto('/me/settings/blocked')

      const blockDisplayName = await bobPage
        .getByTestId(TEST_ID.DIGEST_USER_RICH)
        .first()
        .getByTestId(TEST_ID.DIGEST_USER_RICH_DISPLAY_NAME)
        .innerText()

      expect(stripSpaces(blockDisplayName)).toBe(stripSpaces(aliceDisplayName))

      // Unblock
      await Promise.all([
        waitForAPIResponse({
          page: bobPage,
          path: 'data.toggleBlockUser.isBlocked',
          isOK: (value) => value === false,
        }),
        bobPage
          .getByTestId(TEST_ID.DIGEST_USER_RICH)
          .first()
          .getByRole('button', { name: 'Unblock' })
          .click(),
      ])

      // [Bob] Go to Alice's User Profile and Check Block state
      await bobPage.goto(alicePage.url())
      await bobPage.getByRole('button', { name: 'More Actions' }).click()
      await expect(
        bobPage.getByRole('menuitem', { name: 'Block user' })
      ).toBeVisible()
    }
  )

  authedTest(
    'Alice edit user profile',
    async ({ alicePage, isMobile }) => {
      // [Alice] Go to profile page
      const aliceProfile = new UserProfilePage(alicePage, isMobile)
      await aliceProfile.gotoMeProfile()


      await alicePage.getByRole('button', { name: 'More Actions' }).click()
      await alicePage
        .getByRole('menuitem', { name: 'Edit' })
        .locator('section')
        .click()

      await aliceProfile.setCover()
      await aliceProfile.setAvatar()

      const displayName = await aliceProfile.fillDisplayName()
      const bio = await aliceProfile.fillBio()

      await Promise.all([
        waitForAPIResponse({
          page: alicePage,
          path: 'data.updateUserInfo.displayName',
          isOK: value => value === displayName
        }),
        waitForAPIResponse({
          page: alicePage,
          path: 'data.updateUserInfo.info.description',
          isOK: value => value === bio
        }),
        aliceProfile.dialogSaveButton.click()
      ])

      const aliceDisplayName = await aliceProfile.displayName.innerText()
      expect(aliceDisplayName).toBe(displayName)

      const aliceBio = await aliceProfile.bio.first().innerText()
      expect(aliceBio).toBe(bio)
    }
  )
})
