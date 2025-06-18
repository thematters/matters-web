import { expect, Page, test } from '@playwright/test'

import { TEST_ID } from '~/common/enums'
import { stripSpaces } from '~/common/utils/text'

import {
  authedTest,
  pageGoto,
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

test.describe.configure({ mode: 'serial' })

test.describe('User Mutation', () => {
  authedTest(
    'Bob can follow and unfollow Alice',
    async ({ alicePage, bobPage, isMobile }) => {
      // [Alice] Go to profile page
      const aliceProfile = new UserProfilePage(alicePage, isMobile)
      await aliceProfile.gotoMeProfile()

      // [Bob] Go to profile page
      const bobProfile = new UserProfilePage(bobPage, isMobile)
      await bobProfile.gotoMeProfile()
      await bobPage.waitForTimeout(2 * 1000)

      // [Bob] Go to Alice's User Profile
      await pageGoto(bobPage, alicePage.url())

      // Ensure Bob is not following Alice initially
      if (
        await bobPage
          .getByRole('button', { name: 'Followed', exact: true })
          .isVisible()
      ) {
        await unfollow(bobPage)
      }

      // Test Follow functionality
      await follow(bobPage)

      // Refresh page and verify follow button state
      await bobPage.reload()
      await bobPage.waitForLoadState('networkidle')

      await expect(
        bobPage.getByRole('button', { name: 'Followed', exact: true })
      ).toBeVisible()

      // Get follower count before unfollowing
      const followCount = await bobPage
        .getByTestId(
          isMobile
            ? TEST_ID.USER_PROFILE_FOLLOWERS_COUNT
            : TEST_ID.ASIDE_USER_PROFILE_FOLLOWERS_COUNT
        )
        .innerText()

      // Test Unfollow functionality
      await unfollow(bobPage)

      // Refresh page and verify unfollow worked
      await bobPage.reload()
      await bobPage.waitForLoadState('networkidle')

      // Verify follow button is visible again
      await expect(
        bobPage.getByRole('button', { name: 'Follow', exact: true })
      ).toBeVisible()

      // Verify follower count decreased
      const unfollowCount = await bobPage
        .getByTestId(
          isMobile
            ? TEST_ID.USER_PROFILE_FOLLOWERS_COUNT
            : TEST_ID.ASIDE_USER_PROFILE_FOLLOWERS_COUNT
        )
        .innerText()

      expect(Number(followCount)).toBe(Number(unfollowCount) + 1)
    }
  )

  authedTest(
    'Alice is blocked and unblocked by Bob',
    async ({ alicePage, bobPage, isMobile }) => {
      // [Alice] Go to profile page
      const aliceProfile = new UserProfilePage(alicePage, isMobile)
      await aliceProfile.gotoMeProfile()
      await bobPage.waitForTimeout(2 * 1000)
      const aliceDisplayName = await aliceProfile.displayName.innerText()

      // [Bob] Go to profile page
      const bobProfile = new UserProfilePage(bobPage, isMobile)
      await bobProfile.gotoMeProfile()

      // [Bob] Go to Alice's User Profile
      await pageGoto(bobPage, alicePage.url())

      await bobPage
        .getByTestId(TEST_ID.ASIDE_USER_PROFILE)
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
            .locator('div')
            .click(),
        ])
        await bobPage
          .getByTestId(TEST_ID.ASIDE_USER_PROFILE)
          .getByRole('button', { name: 'More Actions' })
          .click()
      }

      await bobPage
        .getByRole('menuitem', { name: 'Block user' })
        .locator('div')
        .click()

      await Promise.all([
        waitForAPIResponse({
          page: bobPage,
          path: 'data.toggleBlockUser.isBlocked',
          isOK: (value) => value === true,
        }),
        bobPage.getByRole('button', { name: 'Block' }).click(),
      ])

      await pageGoto(bobPage, '/me/settings/blocked')

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
      await bobPage.goto(alicePage.url(), { waitUntil: 'networkidle' })
      await bobPage
        .getByTestId(TEST_ID.ASIDE_USER_PROFILE)
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

    await alicePage.waitForTimeout(2 * 1000)
    await aliceProfile.displayName.click()

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
})
