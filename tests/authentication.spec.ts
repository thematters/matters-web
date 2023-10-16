import { expect, test } from '@playwright/test'

import { TEST_ID } from '~/common/enums'

import { authedTest, login, logout, pageGoto } from './helpers'

test.describe('Authentication', () => {
  test('can login in homepage dialog', async ({ page, isMobile }) => {
    await pageGoto(page, '/')

    // Expect homepage has "Enter" button
    let enterButton
    if (isMobile) {
      enterButton = page.getByRole('link', { name: 'Enter' })
    } else {
      enterButton = page.getByRole('button', { name: 'Enter' })
    }
    await expect(enterButton).toBeVisible()

    // Expect clicking the "Enter" button will open the <UniversalAuthDialog>
    await enterButton.click()
    if (isMobile) {
      await expect(page).toHaveTitle('Enter - Matters')
    } else {
      const authDialog = page.getByTestId(TEST_ID.DIALOG_AUTH)
      await expect(authDialog.first()).toBeVisible()
    }

    await login({ page, fillMode: true, waitForNavigation: true })
    await expect(page).toHaveURL('/')

    // Expect homepage has "Notification" button on the left side
    await expect(page.getByTestId(TEST_ID.SIDE_NAV_NOTIFICATIONS)).toBeVisible()
  })

  test('can login in login page', async ({ page }) => {
    await login({ page, waitForNavigation: true })
    await expect(page).toHaveURL('/')

    // Expect homepage has "Notification" button on the left side
    await expect(page.getByTestId(TEST_ID.SIDE_NAV_NOTIFICATIONS)).toBeVisible()
  })

  authedTest(
    'can login and logout with worker-scoped fixtures',
    async ({ alicePage: page, isMobile }) => {
      await pageGoto(page, '/')

      // [Logged-in] Expect homepage has "Notification" button on the left side
      await expect(
        page.getByTestId(TEST_ID.SIDE_NAV_NOTIFICATIONS)
      ).toBeVisible()

      // Logout
      await logout({ page })

      // [Logged-out] Expect homepage has "Enter" button
      let enterButton
      if (isMobile) {
        enterButton = page.getByRole('link', { name: 'Enter' })
      } else {
        enterButton = page.getByRole('button', { name: 'Enter' })
      }
      await expect(enterButton).toBeVisible()
    }
  )
})
