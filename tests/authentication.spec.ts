import { expect, test } from '@playwright/test'

import { TEST_ID } from '~/common/enums'

import { authedTest, login, logout, pageGoto } from './helpers'
import { PASSWORDOR_CODE } from './helpers/enum'

test.describe.configure({ mode: 'serial' })

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

  test('Login with email and OTP', async ({ page }) => {
    await pageGoto(page, '/login')

    // Login with email & password
    await page.getByRole('button', { name: 'Email', exact: true }).click()

    const email = `e2etest${Date.now()}@matters.town`
    // Fill the form
    await page.getByPlaceholder('Email').fill(email)

    // OTP CODE_EXPIRED error
    await page.getByPlaceholder('Password').fill(PASSWORDOR_CODE.CODE_EXPIRED)
    await page.getByRole('button', { name: 'Sign in' }).click()
    await expect(
      page.getByText('This login code has expired, please try to resend')
    ).toBeVisible()

    // USER_PASSWORD_INVALID error
    await page
      .getByPlaceholder('Password')
      .fill(PASSWORDOR_CODE.USER_PASSWORD_INVALID)
    await page.getByRole('button', { name: 'Sign in' }).click()
    await expect(page.getByText('Incorrect email or password')).toBeVisible()

    // UNKNOWN_ERROR error
    await page.getByPlaceholder('Password').fill(PASSWORDOR_CODE.UNKNOWN_ERROR)
    await page.getByRole('button', { name: 'Sign in' }).click()
    await expect(
      page.getByText('Unknown error. Please try again later.')
    ).toBeVisible()
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
