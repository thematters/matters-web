import { expect, test } from '@playwright/test'

import { TEST_ID } from '~/common/enums'

import { authedTest, login, logout } from './helpers'

test.describe('Authentication', () => {
  test('can login in homepage dialog', async ({ page }) => {
    await page.goto('/')

    // Expect homepage has "Enter" button
    const enterButton = page.getByRole('button', { name: 'Enter' })
    await expect(enterButton).toBeVisible()

    // Expect clicking the "Enter" button will open the <UniversalAuthDialog>
    await enterButton.click()
    const authDialog = page.getByTestId(TEST_ID.DIALOG_AUTH)
    await expect(authDialog.first()).toBeVisible()

    await Promise.all([
      login({ page, fillMode: true }),
      page.waitForNavigation(),
    ])
    await expect(page).toHaveURL('/')

    // Expect homepage has "Notification" button on the left side
    await expect(
      page.getByRole('link', { name: 'Notifications' })
    ).toBeVisible()
  })

  test('can login in login page', async ({ page }) => {
    await login({ page })
    await Promise.all([page.waitForNavigation(), expect(page).toHaveURL('/')])

    // Expect homepage has "Notification" button on the left side
    await expect(
      page.getByRole('link', { name: 'Notifications' })
    ).toBeVisible()
  })

  authedTest(
    'can login and logout with worker-scoped fixtures',
    async ({ alicePage: page }) => {
      await page.goto('/')

      // [Logged-in] Expect homepage has "Notification" button on the left side
      await expect(
        page.getByRole('link', { name: 'Notifications' })
      ).toBeVisible()

      // Logout
      await logout({ page })

      // [Logged-out] Expect homepage has "Enter" button
      const enterButton = page.getByRole('button', { name: 'Enter' })
      await expect(enterButton).toBeVisible()
    }
  )
})
