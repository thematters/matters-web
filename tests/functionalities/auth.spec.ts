import { expect, test } from '@playwright/test'

import { TEST_ID } from '~/common/enums'

import { login } from '../utils'

test('can login in homepage dialog', async ({ page }) => {
  await page.goto('/')

  // Expect homepage has "Enter" button
  const enterButton = page.getByRole('button', { name: 'Enter' })
  await expect(enterButton).toBeVisible()

  // Expect clicking the "Enter" button will open the <UniversalAuthDialog>
  await enterButton.click()
  const authDialog = page.getByTestId(TEST_ID.DIALOG_AUTH)
  await expect(authDialog.first()).toBeVisible()

  await login({
    targetUrl: '/', // homepage
    page,
  })

  // Expect logged-in user's homepage has "Notification" button on the left side
  await expect(page.getByRole('link', { name: 'Notifications' })).toBeVisible()
})

test('can login in login page', async ({ page }) => {
  await page.goto('/login')

  // Login with dialog
  await login({
    targetUrl: '/', // homepage
    page,
  })

  // Expect logged-in user's homepage has "Notification" button on the left side
  await expect(page.getByRole('link', { name: 'Notifications' })).toBeVisible()
})
