import { Page } from '@playwright/test'

import { waitForAPIResponse } from './api'

export type User = {
  email: string
  password: string
}

export const users = {
  alice: {
    email: process.env.PLAYWRIGHT_AUTH_EMAIL_ALICE as string,
    password: process.env.PLAYWRIGHT_AUTH_PWD_ALICE as string,
  } as User,
  bob: {
    email: process.env.PLAYWRIGHT_AUTH_EMAIL_BOB as string,
    password: process.env.PLAYWRIGHT_AUTH_PWD_BOB as string,
  } as User,
}

export const login = async ({
  email = users.alice.email,
  password = users.alice.password,
  page,
  fillMode = false,
  target = '/',
}: {
  email?: string
  password?: string
  page: Page
  fillMode?: boolean
  target?: string
}) => {
  if (!fillMode) {
    target = encodeURIComponent(
      `${process.env.PLAYWRIGHT_TEST_BASE_URL}${target}`
    )
    await page.goto(`/login?target=${target}`)
  }

  // Login with email & password
  await page.getByText('Continue with Email').click()

  // Fill the form
  await page.getByLabel('Email').fill(email)
  await page.getByLabel('Password').fill(password)

  // Submit
  await page.getByRole('button', { name: 'Confirm' }).click()

  await waitForAPIResponse({
    page,
    path: 'data.userLogin.token',
  })
}

export const logout = async ({ page }: { page: Page }) => {
  // Click "My Page" button
  await page.getByRole('button', { name: 'My Page' }).click()

  // Click "Log Out" button
  await Promise.all([
    page.getByRole('menuitem', { name: 'Log Out' }).click(),
    page.waitForNavigation(),
  ])
}
