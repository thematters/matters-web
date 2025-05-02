import { expect, Locator, Page } from '@playwright/test'
import _sample from 'lodash/sample'
import _uniq from 'lodash/uniq'

import { PATHS, TEST_ID } from '~/common/enums'

import { waitForAPIResponse } from '../api'
import {
  generateContent,
  generateSummary,
  generateSupportSetting,
  generateTags,
  generateTitle,
} from '../text'
import { pageGoto } from '../utils'

type License = 'CC BY-NC-ND 4.0 License' | 'CC0 License' | 'All Rights Reserved'

export class DraftDetailPage {
  readonly page: Page
  readonly isMobile: boolean | undefined

  // header
  readonly publishButton: Locator

  // bar
  readonly barAddTag: Locator
  readonly barSetCover: Locator
  readonly barCollectArticle: Locator
  readonly barToggleAddToCircle: Locator
  readonly barToggleISCN: Locator
  readonly barSetLicense: Locator
  readonly barSupportSetting: Locator
  readonly barResponsesAllow: Locator
  readonly barResponsesDisallow: Locator

  // bottombar
  readonly bottombarManage: Locator

  // editing
  readonly titleInput: Locator
  readonly summaryInput: Locator
  readonly contentInput: Locator

  // dialog
  readonly dialog: Locator
  readonly dialogAddButton: Locator
  readonly dialogPublishNowButton: Locator
  readonly dialogPublishButton: Locator
  readonly dialogViewArticleButton: Locator
  readonly dialogSaveButton: Locator
  readonly dialogDoneButton: Locator

  // reediting
  readonly dialogEditButton: Locator
  readonly nextButton: Locator
  readonly dialogSaveRevisions: Locator
  readonly dialogViewRepublishedArticle: Locator

  constructor(page: Page, isMobile?: boolean) {
    this.page = page
    this.isMobile = isMobile

    // header
    this.publishButton = this.page.getByRole('button', { name: 'Publish' })

    // bar
    this.barAddTag = this.page.getByRole('button', {
      name: isMobile ? 'Tag' : 'Add Tag',
    })
    this.barSetCover = this.page.getByRole('button', {
      name: isMobile ? 'Cover' : 'Set Cover',
    })
    this.barCollectArticle = this.page.getByRole('button', {
      name: isMobile ? 'Collect' : 'Collect Article',
    })
    this.barToggleAddToCircle = this.page.getByLabel('Add to Circle')
    this.barToggleISCN = this.page.getByLabel('Register for ISCN')
    this.barSetLicense = this.page.getByRole('button', {
      name: 'CC BY-NC-ND 4.0 License',
    })
    this.barSupportSetting = this.page.getByRole('button', {
      name: 'Support Setting',
    })
    this.barResponsesAllow = this.page.getByTestId(
      TEST_ID.DRAFTS_RESPONSE_ALLOW
    )
    this.barResponsesDisallow = this.page.getByTestId(
      TEST_ID.DRAFTS_RESPONSE_DISALLOW
    )

    // bottombar
    this.bottombarManage = this.page.getByRole('button', {
      name: 'Article Management',
    })

    // editing
    this.titleInput = this.page.getByPlaceholder('Enter title ...')
    this.summaryInput = this.page.getByPlaceholder('Enter summary…')
    this.contentInput = this.page.locator('.tiptap.ProseMirror')

    // dialog
    this.dialog = this.page.getByRole('dialog')
    this.dialogAddButton = this.page.getByTestId(
      TEST_ID.EDITOR_SEARCH_SELECT_FORM_DIALOG_ADD_BUTTON
    )
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
      name: 'Confirm',
    })
    this.dialogDoneButton = this.dialog.getByRole('button', {
      name: 'Done',
    })

    // reediting
    this.dialogEditButton = this.dialog.getByRole('button', { name: 'Edit' })
    this.nextButton = this.page.getByRole('button', { name: 'Next' })
    this.dialogSaveRevisions = this.dialog.getByRole('button', {
      name: 'Save Revisions',
    })
    this.dialogViewRepublishedArticle = this.dialog.getByRole('button', {
      name: 'View republished article',
    })
  }

  async createDraft() {
    await pageGoto(this.page, PATHS.ME_DRAFT_NEW)

    await this.page.waitForURL(PATHS.ME_DRAFT_NEW)
    await expect(this.page).toHaveURL(PATHS.ME_DRAFT_NEW)
  }

  async gotoLatestDraft() {
    await this.page.goto(PATHS.ME_DRAFTS)

    await this.page.getByRole('listitem').first().click()
    await this.page.waitForURL(`**${PATHS.ME_DRAFT_DETAIL}`)
  }

  async fillTitle(title?: string) {
    const _title = title || generateTitle()
    await this.titleInput.focus()
    await this.titleInput.fill(_title)
    return _title
  }

  async fillSummary() {
    const summary = generateSummary()
    await this.summaryInput.fill(summary)
    return summary
  }

  async fillContent(title: string) {
    let content = generateContent({})
    await this.contentInput.fill(content)

    // Update the content to make the publish button clickable
    while (await this.publishButton.isDisabled()) {
      await this.contentInput.press('End')
      await this.contentInput.press('KeyA')
      await this.page.waitForTimeout(1000 * 2)
      await this.contentInput.focus()
      await this.contentInput.press('Backspace')
      await this.page.waitForTimeout(1000 * 2)
      await this.fillTitle(title)
    }

    return content
  }

  async setTags() {
    await this.barAddTag.click()

    const tags = _uniq(generateTags({ count: 3 }))
    for (const tag of tags) {
      await this.dialogAddButton.click()
      await this.page.getByPlaceholder('Search tags').fill(tag)
      await this.page.getByTestId(TEST_ID.SEARCH_RESULTS_ITEM).first().click()
    }

    await this.dialogDoneButton.click()

    return tags
  }

  async setCover() {
    await this.barSetCover.click()

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
    if (this.isMobile) {
      await this.bottombarManage.click()
    }

    await this.barSupportSetting.click()

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
    await this.barCollectArticle.click()
    await this.dialogAddButton.click()

    // type and search
    const searchKey = 'test'
    await this.page
      .getByPlaceholder('Enter article title or paste article link')
      .fill(searchKey)

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
    await this.dialogDoneButton.click()

    return articleTitle
  }

  async checkResponse({ allow }: { allow?: Boolean }) {
    if (this.isMobile) {
      await this.bottombarManage.click()
    }

    if (allow) {
      await this.page.evaluate(() => {
        window.scrollTo(0, 0)
      })
      await this.barResponsesAllow.click()
    } else {
      await this.page.evaluate(() => {
        window.scrollTo(0, 0)
      })
      await this.barResponsesDisallow.click()
    }

    if (this.isMobile) {
      await this.dialogDoneButton.click()
    }
  }

  async checkAddToCicle() {
    if (this.isMobile) {
      await this.bottombarManage.click()
    }

    const hasAddToCircle = await this.barToggleAddToCircle.isVisible()
    if (!hasAddToCircle) {
      if (this.isMobile) {
        await this.dialogDoneButton.click()
      }
      return
    }

    // FIXME: error will be throw if using .check()
    // https://github.com/microsoft/playwright/issues/13470
    await Promise.all([
      waitForAPIResponse({
        page: this.page,
        path: 'data.putDraft.access.circle',
      }),
      this.barToggleAddToCircle.click(),
    ])

    if (this.isMobile) {
      await this.dialogDoneButton.click()
    }

    return true
  }

  async checkISCN() {
    if (this.isMobile) {
      await this.bottombarManage.click()
    }

    // FIXME: error will be throw if using .check()
    // https://github.com/microsoft/playwright/issues/13470
    await this.barToggleISCN.click()

    await waitForAPIResponse({
      page: this.page,
      path: 'data.putDraft.iscnPublish',
    })

    if (this.isMobile) {
      await this.dialogDoneButton.click()
    }

    return true
  }

  async setLicense({ license }: { license?: License }) {
    license =
      license ||
      _sample(['CC BY-NC-ND 4.0 License', 'CC0 License', 'All Rights Reserved'])

    if (this.isMobile) {
      await this.bottombarManage.click()
    }

    await this.barSetLicense.click()
    await this.page.getByRole('option', { name: license }).click()

    if (this.isMobile) {
      await this.dialogDoneButton.click()
    }

    return license
  }

  async publish() {
    await this.publishButton.click()
    await this.dialogPublishNowButton.click()
    await this.dialogPublishButton.click()
    await expect(this.dialogViewArticleButton).toBeVisible()
  }

  async rePublish() {
    await this.nextButton.click()
    await this.dialogPublishButton.click()
    await this.dialogPublishButton.click()
    await this.page.waitForLoadState('networkidle')
    await expect(this.dialogViewRepublishedArticle).toBeVisible()
  }
}
