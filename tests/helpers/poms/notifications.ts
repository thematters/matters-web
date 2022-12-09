import { Page } from '@playwright/test'

export class NotificationsPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async goto() {
    await this.page.goto('/me/notifications')
  }
}
