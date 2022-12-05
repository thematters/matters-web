import { expect, Page, Response } from '@playwright/test'
import _get from 'lodash/get'

export const login = async ({
  email = process.env.PLAYWRIGHT_AUTH_EMAIL_1 as string,
  password = process.env.PLAYWRIGHT_AUTH_PWD_1 as string,
  page,
  fillMode = false,
}: {
  email?: string
  password?: string
  page: Page
  fillMode?: boolean
}) => {
  if (!fillMode) {
    await page.goto('/login')
  }

  // Login with email & password
  await page.getByText('Continue with Email').click()

  // Fill the form
  await page.getByLabel('Email').fill(email)
  await page.getByLabel('Password').fill(password)

  // Submit
  await page.getByRole('button', { name: 'Confirm' }).click()

  // Wait for API response from login request
  await page.waitForResponse(async (res: Response) => {
    const body = (await res.body()).toString()

    try {
      const parsedBody = JSON.parse(body)
      const isLoggedIn = !!_get(parsedBody, 'data.userLogin.token')
      if (isLoggedIn) {
        return true
      }
    } catch (error) {
      // console.error(error)
    }

    return false
  })
}

export const logout = async ({ page }: { page: Page }) => {
  // Click "My Page" button
  await page.getByRole('button', { name: 'My Page' }).click()

  // Click "Log Out" button
  await page.getByRole('menuitem', { name: 'Log Out' }).click()
  await page.screenshot({ path: '12rf.png' })
  await page.waitForNavigation()
  await expect(page).toHaveURL('/')
}
