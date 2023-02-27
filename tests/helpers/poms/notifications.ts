import { Page } from '@playwright/test'

import { pageGoto } from '../utils'

export class NotificationsPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async goto() {
    await pageGoto(this.page, '/me/notifications')
  }
}
