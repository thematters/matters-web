import { Locator, Page } from '@playwright/test'

import { TEST_ID } from '~/common/enums'

import { waitForAPIResponse } from '../api'
import { pageGoto } from '../utils'

export class HomePage {
  readonly page: Page

  readonly tabFeatured: Locator
  readonly tabNewest: Locator

  feedArticles: Locator
  sidebarTags: Locator
  sidebarUsers: Locator

  constructor(page: Page) {
    this.page = page

    this.tabFeatured = page.getByRole('link', { name: 'Featured' })
    this.tabNewest = page.getByRole('link', { name: 'Latest' })

    this.feedArticles = page.getByTestId(TEST_ID.DIGEST_ARTICLE_FEED)
    this.sidebarTags = page.getByTestId(TEST_ID.DIGEST_TAG_ARTICLE)
    this.sidebarUsers = page.getByTestId(TEST_ID.DIGEST_USER_RICH)
  }

  async goto() {
    await pageGoto(this.page, '/newest')
  }

  async shuffleSidebarUsers() {
    await this.page.getByRole('button', { name: 'Shuffle' }).last().click()

    await waitForAPIResponse({
      page: this.page,
      path: 'data.viewer.recommendation.authors',
    })
  }
}
