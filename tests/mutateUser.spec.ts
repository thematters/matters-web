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

  // Note: Some mouse cursor hover button now, button text is 'Unfollow'.
  // Move the mouse to (0, 0) to avoid button hover state
  await page.mouse.move(0, 0)

  await expect(
    page.getByRole('button', { name: 'Followed', exact: true })
  ).toBeVisible()
}

const unfollow = async (page: Page) => {
  await page.mouse.move(0, 0)
  await Promise.all([
    waitForAPIResponse({
      page: page,
      path: 'data.toggleFollowUser.isFollowee',
      isOK: (value) => value === false,
    }),
    page.getByRole('button', { name: 'Followed', exact: true }).click(),
  ])
  await expect(
    page.getByRole('button', { name: 'Follow', exact: true })
  ).toBeVisible()
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

      await bobPage.reload()

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

      await bobPage
        .getByTestId(TEST_ID.LAYOUT_HEADER)
        .getByRole('button', { name: 'More Actions' })
        .click()

      // [Bob] check block state
      if (
        await bobPage.getByRole('menuitem', { name: 'Unblock' }).isVisible()
      ) {
        await Promise.all([
          waitForAPIResponse({
            page: bobPage,
            path: 'data.toggleBlockUser.isBlocked',
            isOK: (value) => value === false,
          }),
          bobPage
            .getByRole('menuitem', { name: 'Unblock' })
            .locator('section')
            .click(),
        ])
        await bobPage
          .getByTestId(TEST_ID.LAYOUT_HEADER)
          .getByRole('button', { name: 'More Actions' })
          .click()
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
      await bobPage
        .getByTestId(TEST_ID.LAYOUT_HEADER)
        .getByRole('button', { name: 'More Actions' })
        .click()
      await expect(
        bobPage.getByRole('menuitem', { name: 'Block user' })
      ).toBeVisible()
    }
  )

  authedTest('Alice edit user profile', async ({ alicePage, isMobile }) => {
    // [Alice] Go to profile page
    const aliceProfile = new UserProfilePage(alicePage, isMobile)
    await aliceProfile.gotoMeProfile()

    await aliceProfile.moreButton.click()
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
        path: 'data.updateUserInfo',
        isOK: (value) =>
          value.displayName === displayName && value.info.description === bio,
      }),
      aliceProfile.dialogSaveButton.click(),
    ])

    const aliceDisplayName = await aliceProfile.displayName.innerText()
    expect(stripSpaces(aliceDisplayName)).toBe(stripSpaces(displayName))

    const aliceBio = await aliceProfile.bio.first().innerText()
    expect(stripSpaces(aliceBio)).toBe(stripSpaces(bio))
  })

  authedTest.skip(
    'Alice switch display language',
    async ({ alicePage, isMobile }) => {
      // [Alice] Go to setting page
      await alicePage.goto('/')
      await alicePage.getByRole('button', { name: 'My Page' }).click()
      await alicePage
        .getByRole('link', { name: 'Settings', exact: true })
        .click()

      await alicePage.getByRole('button', { name: 'Language English' }).click()
      await Promise.all([
        waitForAPIResponse({
          page: alicePage,
          path: 'data.updateUserInfo.settings.language',
          isOK: (value) => value === 'zh_hant',
        }),
        alicePage
          .getByRole('menuitem', { name: '繁體中文' })
          .locator('section')
          .click(),
      ])

      await alicePage.reload()

      await alicePage.getByRole('button', { name: '介面語言 繁體中文' }).click()
      await Promise.all([
        waitForAPIResponse({
          page: alicePage,
          path: 'data.updateUserInfo.settings.language',
          isOK: (value) => value === 'zh_hans',
        }),
        alicePage
          .getByRole('menuitem', { name: '简体中文' })
          .locator('section')
          .click(),
      ])

      await alicePage.reload()

      await alicePage.getByRole('button', { name: '界面语言 简体中文' }).click()
      await Promise.all([
        waitForAPIResponse({
          page: alicePage,
          path: 'data.updateUserInfo.settings.language',
          isOK: (value) => value === 'en',
        }),
        alicePage
          .getByRole('menuitem', { name: 'English' })
          .locator('section')
          .click(),
      ])
    }
  )
})
