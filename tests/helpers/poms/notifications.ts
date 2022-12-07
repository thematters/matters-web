import { Locator, Page } from '@playwright/test'

export class NotificationsPage {
  readonly page: Page
  readonly getStartedLink: Locator

  constructor(page: Page) {
    this.page = page
    this.getStartedLink = page.locator('a', { hasText: 'Get started' })
  }

  async goto() {
    await this.page.goto('https://playwright.dev')
  }
}
