import { Page } from '@playwright/test'

import { TEST_ID } from '~/common/enums'

import { waitForAPIResponse } from './api'

export type User = {
  email: string
  password: string
  paymentPassword: string
}

export const users = {
  alice: {
    email: process.env.PLAYWRIGHT_AUTH_EMAIL_ALICE as string,
    password: process.env.PLAYWRIGHT_AUTH_PWD_ALICE as string,
    paymentPassword: process.env.PLAYWRIGHT_PAYMENT_PWD_ALICE as string,
  } as User,
  bob: {
    email: process.env.PLAYWRIGHT_AUTH_EMAIL_BOB as string,
    password: process.env.PLAYWRIGHT_AUTH_PWD_BOB as string,
    paymentPassword: process.env.PLAYWRIGHT_PAYMENT_PWD_BOB as string,
  } as User,
}

export const login = async ({
  email = users.alice.email,
  password = users.alice.password,
  page,
  target = '/',
  fillMode = false,
  waitForNavigation = false,
}: {
  email?: string
  password?: string
  page: Page
  target?: string
  fillMode?: boolean
  waitForNavigation?: boolean
}) => {
  if (!fillMode) {
    target = encodeURIComponent(
      `${process.env.PLAYWRIGHT_TEST_BASE_URL}${target}`
    )
    await page.goto(`/login?target=${target}`, { waitUntil: 'networkidle' })
  }

  // Login with email & password
  await page.getByRole('button', { name: 'Continue with Email' }).click()

  // Fill the form
  await page.getByPlaceholder('Email').fill(email)
  await page.getByPlaceholder('Password').fill(password)

  // Submit
  await page.getByRole('button', { name: 'Confirm' }).click()

  await Promise.all([
    waitForAPIResponse({
      page,
      path: 'data.userLogin.token',
    }),
    waitForNavigation ? page.waitForNavigation() : undefined,
  ])
}

export const logout = async ({ page }: { page: Page }) => {
  // Click "My Page" button
  await page.getByTestId(TEST_ID.SIDE_NAV_MY_PAGE).click()

  // Click "Log Out" button
  // Promise.all prevents a race condition between clicking and waiting.
  await Promise.all([
    page.waitForNavigation(),
    page.getByRole('menuitem', { name: 'Log Out' }).click(),
  ])
}
