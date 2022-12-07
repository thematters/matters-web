import { expect, Locator, Page } from '@playwright/test'

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

  async publish() {
    await this.publishButton.click()
    await this.dialogPublishNowButton.click()
    await this.dialogPublishButton.click()
    await expect(this.dialogViewArticleButton).toBeVisible()
  }
}
