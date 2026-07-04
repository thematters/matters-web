import { Page } from '@playwright/test'

export const pageGoto = async (
  page: Page,
  path: string,
  waitUntil:
    | 'load'
    | 'domcontentloaded'
    | 'networkidle'
    | 'commit' = 'networkidle'
) => await page.goto(path, { waitUntil })

export const sleep = async (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
