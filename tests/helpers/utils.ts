import { Page } from '@playwright/test'

export const pageGoto = async (page: Page, path: string) =>
  await page.goto(path, { waitUntil: 'networkidle' })

export const sleep = async (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
