import { Locator, Page, Response } from '@playwright/test'
import _get from 'lodash/get'

import { TEST_ID } from '~/common/enums'

export class HomePage {
  readonly page: Page

  readonly tabTrending: Locator
  readonly tabLatest: Locator

  feedArticles: Locator
  sidebarTags: Locator
  sidebarUsers: Locator

  constructor(page: Page) {
    this.page = page

    this.tabTrending = page.getByRole('tab').filter({ hasText: 'Trending' })
    this.tabLatest = page.getByRole('tab').filter({ hasText: 'Latest' })

    this.feedArticles = page.getByTestId(TEST_ID.DIGEST_ARTICLE_FEED)
    this.sidebarTags = page.getByTestId(TEST_ID.DIGEST_TAG_SIDEBAR)
    this.sidebarUsers = page.getByTestId(TEST_ID.DIGEST_USER_RICH)
  }

  async goto() {
    await this.page.goto('/')
  }

  async getFeedArticles() {
    this.feedArticles = this.page.getByTestId(TEST_ID.DIGEST_ARTICLE_FEED)
  }

  async shuffleSidebarTags() {
    // click shuffle button
    await this.page.getByRole('button', { name: 'Shuffle' }).first().click()

    // wait for the API response
    await this.page.waitForResponse(async (res: Response) => {
      try {
        const body = (await res.body()).toString()
        const parsedBody = JSON.parse(body)
        const tags = !!_get(parsedBody, 'data.viewer.recommendation.tags')
        if (tags) {
          return true
        }
      } catch (error) {
        // console.error(error)
      }

      return false
    })

    // relocale the sidebar tags
    this.sidebarTags = this.page.getByTestId(TEST_ID.DIGEST_TAG_SIDEBAR)
  }

  async shuffleSidebarUsers() {
    // click shuffle button
    await this.page.getByRole('button', { name: 'Shuffle' }).last().click()

    // wait for the API response
    await this.page.waitForResponse(async (res: Response) => {
      try {
        const body = (await res.body()).toString()
        const parsedBody = JSON.parse(body)
        const users = !!_get(parsedBody, 'data.viewer.recommendation.authors')
        if (users) {
          return true
        }
      } catch (error) {
        // console.error(error)
      }

      return false
    })

    // relocale the sidebar tags
    this.sidebarUsers = this.page.getByTestId(TEST_ID.DIGEST_USER_RICH)
  }
}
