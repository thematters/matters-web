import { expect, Locator, Page } from '@playwright/test'

import { TEST_ID } from '~/common/enums'

export class UserProfilePage {
  readonly page: Page
  readonly isMobile: boolean | undefined

  // header
  // moreButton: Locator
  // shareButton: Locator

  // profile
  // followButton: Locator
  // rssButton: Locator
  // ethAddress: Locator

  // feeds
  tabArticles: Locator
  tabComments: Locator
  tabTags: Locator
  feedArticles: Locator
  // feedComments: Locator
  // feedTags: Locator

  // dialog
  readonly dialog: Locator

  constructor(page: Page, isMobile?: boolean) {
    this.page = page
    this.isMobile = isMobile

    // feeds
    this.tabArticles = page.getByRole('tab').filter({ hasText: 'Articles' })
    this.tabComments = page.getByRole('tab').filter({ hasText: 'Responses' })
    this.tabTags = page.getByRole('tab').filter({ hasText: 'Tags' })
    this.feedArticles = page.getByTestId(TEST_ID.DIGEST_ARTICLE_FEED)

    // dialog
    this.dialog = this.page.getByRole('dialog')
  }

  async gotoMeProfile() {
    // go to homepage
    await this.page.goto('/')

    // click "My Page" button
    await this.page.getByRole('button', { name: 'My Page' }).click()

    // click "Profile" link
    await this.page.getByRole('link', { name: 'Profile' }).click()

    // confirm User Profile Page
    await expect(this.page.getByTestId(TEST_ID.USER_PROFILE)).toBeVisible()
  }

  async goto(userName: string) {
    await this.page.goto(`/@${userName}`)
  }
}
