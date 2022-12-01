import { expect, Page } from '@playwright/test'

export const login = async ({
  email = process.env.PLAYWRIGHT_AUTH_EMAIL as string,
  password = process.env.PLAYWRIGHT_AUTH_PWD as string,
  targetUrl = '/' as string,
  page,
}: {
  email?: string
  password?: string
  targetUrl?: string | RegExp
  page: Page
}) => {
  // Login and redirection
  await page.getByText('Continue with Email').click()
  await page.getByLabel('Email').fill(email)
  await page.getByLabel('Password').fill(password)
  await page.getByRole('button', { name: 'Confirm' }).click()
  await page.waitForNavigation()
  await expect(page).toHaveURL(targetUrl)
}
