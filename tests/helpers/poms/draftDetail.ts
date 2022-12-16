import { expect, Locator, Page } from '@playwright/test'
import _sample from 'lodash/sample'
import _uniq from 'lodash/uniq'

import { TEST_ID } from '~/common/enums'

import { waitForAPIResponse } from '../api'
import {
  generateContent,
  generateSummary,
  generateSupportSetting,
  generateTags,
  generateTitle,
} from '../text'

type License = 'CC BY-NC-ND 2.0 License' | 'CC0 License' | 'All Rights Reserved'

export class DraftDetailPage {
  readonly page: Page

  // header
  readonly publishButton: Locator

  // sidebar
  readonly sidebarAddTag: Locator
  readonly sidebarSetCover: Locator
  readonly sidebarCollectArticle: Locator
  readonly sidebarToggleAddToCircle: Locator
  readonly sidebarToggleISCN: Locator
  readonly sidebarSetLicense: Locator
  readonly sidebarSupportSetting: Locator

  // editing
  readonly titleInput: Locator
  readonly summaryInput: Locator
  readonly contentInput: Locator

  // dialog
  readonly dialog: Locator
  readonly dialogPublishNowButton: Locator
  readonly dialogPublishButton: Locator
  readonly dialogViewArticleButton: Locator
  readonly dialogSaveButton: Locator

  constructor(page: Page) {
    this.page = page

    // header
    this.publishButton = this.page.getByRole('button', { name: 'Publish' })

    // sidebar
    this.sidebarAddTag = this.page.getByRole('button', { name: 'Add Tag' })
    this.sidebarSetCover = this.page.getByRole('button', { name: 'Set Cover' })
    this.sidebarCollectArticle = this.page.getByRole('button', {
      name: 'Collect Article',
    })
    this.sidebarToggleAddToCircle = this.page.getByLabel('Add to Circle')
    this.sidebarToggleISCN = this.page.getByLabel('Register for ISCN')
    this.sidebarSetLicense = this.page.getByRole('button', {
      name: 'CC BY-NC-ND 2.0 License',
    })
    this.sidebarSupportSetting = this.page.getByRole('button', {
      name: 'Support Setting',
    })

    // editing
    this.titleInput = this.page.getByPlaceholder('Enter title')
    this.summaryInput = this.page.getByPlaceholder('Enter summary')
    this.contentInput = this.page.locator('.ql-editor')

    // dialog
    this.dialog = this.page.getByRole('dialog')
    this.dialogPublishNowButton = this.dialog.getByRole('button', {
      name: 'Publish Now',
    })
    this.dialogPublishButton = this.dialog.getByRole('button', {
      name: 'Publish',
    })
    this.dialogViewArticleButton = this.dialog.getByRole('button', {
      name: 'View Article',
    })
    this.dialogSaveButton = this.dialog.getByRole('button', {
      name: 'Save',
    })
  }

  async createDraft() {
    await this.page.goto('/')

    // Promise.all prevents a race condition between clicking and waiting.
    await Promise.all([
      this.page.waitForNavigation(),
      this.page.getByRole('button', { name: 'Create' }).click(),
    ])
    await expect(this.page).toHaveURL(/\/me\/drafts\/.*-.*/)
  }

  async gotoLatestDraft() {
    await this.page.goto('/me/drafts')

    // Promise.all prevents a race condition between clicking and waiting.
    await Promise.all([
      this.page.getByRole('listitem').first().click(),
      this.page.waitForNavigation(),
    ])
  }

  async fillTitle() {
    const title = generateTitle()
    await this.titleInput.fill(title)
    return title
  }

  async fillSummary() {
    const summary = generateSummary()
    await this.summaryInput.fill(summary)
    return summary
  }

  async fillContent() {
    const content = generateContent({})
    await this.contentInput.fill(content)
    return content
  }

  async setTags() {
    await this.sidebarAddTag.click()

    const tags = _uniq(generateTags({ count: 3 }))
    for (const tag of tags) {
      await this.page.getByLabel('Search').fill(tag)
      await this.page.getByTestId(TEST_ID.SEARCH_RESULTS_ITEM).first().click()
    }

    await this.dialogSaveButton.click()

    return tags
  }

  async setCover() {
    await this.sidebarSetCover.click()

    await this.page
      .getByLabel('Upload Cover')
      .setInputFiles('./tests/helpers/assets/320x180.jpg')

    await waitForAPIResponse({
      page: this.page,
      path: 'data.node.assets',
    })

    await this.dialogSaveButton.click()

    return true
  }

  async setSupportSetting({
    replyToDonator,
    requestForDonation,
  }: {
    replyToDonator?: boolean
    requestForDonation?: boolean
  }) {
    await this.sidebarSupportSetting.click()

    replyToDonator =
      typeof replyToDonator === 'boolean'
        ? replyToDonator
        : _sample([true, false])
    requestForDonation =
      typeof requestForDonation === 'boolean'
        ? requestForDonation
        : _sample([true, false])

    let replyToDonatorText = ''
    let requestForDonationText = ''

    if (replyToDonator) {
      replyToDonatorText = generateSupportSetting()
      await this.page.getByRole('button', { name: 'Thank-you card' }).click()
      await this.page.getByLabel('Thank-you card').fill(replyToDonatorText)
    }

    if (requestForDonation) {
      requestForDonationText = generateSupportSetting()
      await this.page.getByRole('button', { name: 'Call-to-Support' }).click()
      await this.page.getByLabel('Call-to-Support').fill(requestForDonationText)
    }

    await this.dialogSaveButton.click()

    return { replyToDonatorText, requestForDonationText }
  }

  async setCollection() {
    await this.sidebarCollectArticle.click()

    // type and search
    const searchKey = 'test'
    await this.page.getByLabel('Search').fill(searchKey)

    await waitForAPIResponse({
      page: this.page,
      path: 'data.search.edges',
    })

    // select first search result
    let articleTitle = ''
    const searchResults = this.page.getByTestId(TEST_ID.SEARCH_RESULTS_ITEM)
    if ((await searchResults.count()) >= 1) {
      const title = await searchResults.first().getByRole('heading').innerText()
      await searchResults.first().click()
      articleTitle = title
    }

    // save
    await this.dialogSaveButton.click()

    return articleTitle
  }

  async checkAddToCicle() {
    const hasAddToCircle = await this.sidebarToggleAddToCircle.isVisible()
    if (!hasAddToCircle) {
      return
    }

    await waitForAPIResponse({
      page: this.page,
      path: 'data.putDraft.access.circle',
    })

    // FIXME: error will be throw if using .check()
    // https://github.com/microsoft/playwright/issues/13470
    await this.sidebarToggleAddToCircle.click()

    return true
  }

  async checkISCN() {
    // FIXME: error will be throw if using .check()
    // https://github.com/microsoft/playwright/issues/13470
    await this.sidebarToggleISCN.click()

    await waitForAPIResponse({
      page: this.page,
      path: 'data.putDraft.iscnPublish',
    })

    return true
  }

  async setLicense({ license }: { license?: License }) {
    license =
      license ||
      _sample(['CC BY-NC-ND 2.0 License', 'CC0 License', 'All Rights Reserved'])
    await this.sidebarSetLicense.click()
    await this.page.getByRole('option', { name: license }).click()
    return license
  }

  async publish() {
    await this.publishButton.click()
    await this.dialogPublishNowButton.click()
    await this.dialogPublishButton.click()
    await expect(this.dialogViewArticleButton).toBeVisible()
  }
}
