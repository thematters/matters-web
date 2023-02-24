import { Locator, Page } from '@playwright/test'

import { sleep } from '@/src/common/utils/time'
import { TEST_ID } from '~/common/enums'

import { waitForAPIResponse } from '../api'
import { generateBio, generateDisplayName } from '../text'

export class UserProfilePage {
  readonly page: Page
  readonly isMobile: boolean | undefined

  // header
  moreButton: Locator
  // shareButton: Locator

  // profile
  displayName: Locator
  bio: Locator
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
  readonly dialogSaveButton: Locator
  readonly dialogDisplayNameInput: Locator
  readonly dialogBioInput: Locator

  constructor(page: Page, isMobile?: boolean) {
    this.page = page
    this.isMobile = isMobile

    // header
    this.moreButton = page
      .getByTestId(TEST_ID.LAYOUT_HEADER)
      .getByRole('button', { name: 'More Actions' })

    this.feedArticles = page.getByTestId(TEST_ID.DIGEST_ARTICLE_FEED)

    // profile
    this.displayName = page.getByTestId(TEST_ID.USER_PROFILE_DISPLAY_NAME)
    this.bio = page.getByTestId(TEST_ID.USER_PROFILE_BIO)

    // feeds
    this.tabArticles = page.getByRole('tab').filter({ hasText: 'Articles' })
    this.tabComments = page.getByRole('tab').filter({ hasText: 'Responses' })
    this.tabTags = page.getByRole('tab').filter({ hasText: 'Tags' })
    this.feedArticles = page.getByTestId(TEST_ID.DIGEST_ARTICLE_FEED)

    // dialog
    this.dialog = this.page.getByRole('dialog')
    this.dialogSaveButton = this.dialog.getByRole('button', {
      name: 'Save',
    })
    this.dialogDisplayNameInput = this.page.getByPlaceholder('Display Name')
    this.dialogBioInput = this.page.getByPlaceholder('Enter Bio')
  }

  async gotoMeProfile() {
    // go to homepage
    await this.page.goto('/')

    await sleep(5 * 1000)
    // click "My Page" button
    await this.page.getByRole('button', { name: 'My Page' }).click()

    // click "Profile" link
    await this.page.getByRole('link', { name: 'Profile' }).click()

    // confirm User Profile Page
    // await expect(this.page.getByTestId(TEST_ID.USER_PROFILE)).toBeVisible()
    // await expect(this.feedArticles.first()).toBeVisible()
  }

  async goto(userName: string) {
    await this.page.goto(`/@${userName}`)
  }

  async setCover() {
    await this.dialog
      .getByLabel('Upload Cover')
      .setInputFiles('./tests/helpers/assets/320x180.jpg')

    await waitForAPIResponse({
      page: this.page,
      path: 'data.singleFileUpload.type',
      isOK: (value) => value === 'profileCover',
    })

    return true
  }

  async setAvatar() {
    await this.dialog
      .getByLabel('Upload avatar')
      .setInputFiles('./tests/helpers/assets/257x257.jpg')

    await waitForAPIResponse({
      page: this.page,
      path: 'data.singleFileUpload.type',
      isOK: (value) => value === 'avatar',
    })

    return true
  }

  async fillDisplayName() {
    const displayName = generateDisplayName()
    await this.dialogDisplayNameInput.fill(displayName)
    return displayName
  }

  async fillBio() {
    const bio = generateBio()
    await this.dialogBioInput.fill(bio)
    return bio
  }
}
