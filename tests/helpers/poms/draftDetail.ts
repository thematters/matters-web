import { expect, Locator, Page, Response } from '@playwright/test'
import _get from 'lodash/get'
import _sample from 'lodash/sample'

import { TEST_ID } from '~/common/enums'

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
    this.sidebarSetLicense = this.page.getByRole('option', {
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
    await this.page.getByRole('button', { name: 'Create' }).click()
    await this.page.waitForNavigation()
    await expect(this.page).toHaveURL(/\/me\/drafts\/.*-.*/)
  }

  async gotoLatestDraft() {
    await this.page.goto('/me/drafts')
    await this.page.getByRole('listitem').first().click()
    await this.page.waitForNavigation()
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

    const tags = generateTags({ count: 3 })
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
      .setInputFiles('../assets/320x180.jpg')
    await expect(
      this.page.getByRole('button', { name: 'Set as cover' })
    ).toBeVisible()

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
      await this.page.getByRole('button', { name: 'Call-to-Support' }).click()
      await this.page.getByLabel('Call-to-Support').fill(replyToDonatorText)
    }

    if (requestForDonation) {
      requestForDonationText = generateSupportSetting()
      await this.page.getByRole('button', { name: 'Thank-you card' }).click()
      await this.page.getByLabel('Thank-you card').fill(requestForDonationText)
    }

    await this.dialogSaveButton.click()

    return { replyToDonatorText, requestForDonationText }
  }

  async setCollection() {
    await this.sidebarCollectArticle.click()

    // type and search
    const searchKey = 'test'
    await this.page.getByLabel('Search').fill(searchKey)

    // wait for the API response
    await this.page.waitForResponse(async (res: Response) => {
      try {
        const body = (await res.body()).toString()
        const parsedBody = JSON.parse(body)
        const articles = !!_get(parsedBody, 'data.search.edges')
        if (articles) {
          return true
        }
      } catch (error) {
        // console.error(error)
      }

      return false
    })

    // select first search result
    const collectedArticles: string[] = []
    const searchResults = this.page.getByTestId(TEST_ID.SEARCH_RESULTS_ITEM)
    if ((await searchResults.count()) >= 1) {
      const title = await searchResults.first().getByRole('heading').innerText()
      await searchResults.first().click()
      collectedArticles.push(title)
    }

    // save
    await this.dialogSaveButton.click()

    return collectedArticles
  }

  async toggleAddToCicle({ check }: { check?: boolean }) {
    const hasAddToCircle = await this.sidebarToggleAddToCircle.isVisible()

    if (!hasAddToCircle) {
      return
    }

    check = typeof check === 'boolean' ? check : _sample([true, false])
    await this.sidebarToggleAddToCircle[check ? 'check' : 'uncheck']()
    return check
  }

  async toggleISCN({ check }: { check?: boolean }) {
    check = typeof check === 'boolean' ? check : _sample([true, false])
    await this.sidebarToggleISCN[check ? 'check' : 'uncheck']()
    return check
  }

  async setLicense({ license }: { license?: License }) {
    license =
      license ||
      _sample(['CC BY-NC-ND 2.0 License', 'CC0 License', 'All Rights Reserved'])
    await this.sidebarSetLicense.click()
    await this.page.getByRole('option', { name: license }).last().click()
    return license
  }

  async publish() {
    await this.publishButton.click()
    await this.dialogPublishNowButton.click()
    await this.dialogPublishButton.click()
    await expect(this.dialogViewArticleButton).toBeVisible()
  }
}
