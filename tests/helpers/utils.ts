import { Page } from '@playwright/test'

export const pageGoto = async (page: Page, path: string) =>
  await page.goto(path, { waitUntil: 'networkidle' })
