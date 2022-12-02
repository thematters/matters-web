import { Page } from '@playwright/test'

export const login = async ({
  email = process.env.PLAYWRIGHT_AUTH_EMAIL as string,
  password = process.env.PLAYWRIGHT_AUTH_PWD as string,
  page,
  fillMode = false,
}: {
  email?: string
  password?: string
  page: Page
  fillMode?: boolean
}) => {
  if (fillMode) {
    await page.goto('/login')
  }

  // Login with email & password
  await page.getByText('Continue with Email').click()

  // Fill the form
  await page.getByLabel('Email').fill(email)
  await page.getByLabel('Password').fill(password)

  // Submit
  await page.getByRole('button', { name: 'Confirm' }).click()
}

export const logout = async ({ page }: { page: Page }) => {
  // Click "My Page" button
  await page.getByRole('button', { name: 'My Page' }).click()

  // Click "Log Out" button
  await page.getByRole('listitem', { name: 'Log Out' }).click()
}
