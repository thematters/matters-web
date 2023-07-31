import { Locator, Page } from '@playwright/test'
import _range from 'lodash/range'

import { TEST_ID } from '~/common/enums'
import { stripSpaces } from '~/common/utils/text'

import { waitForAPIResponse } from '../api'
import { generateComment } from '../text'

export class ArticleDetailPage {
  readonly page: Page

  // header
  readonly translateButton: Locator
  readonly ipfsButton: Locator

  // content
  readonly title: Locator
  readonly summary: Locator
  readonly content: Locator
  readonly tagList: Locator
  readonly collection: Locator
  readonly license: Locator
  readonly supportButton: Locator
  readonly supportRequest: Locator
  readonly supportReply: Locator
  readonly viewSupportersButton: Locator

  // comment
  readonly toggleArticleOnly: Locator

  // toolbar
  readonly toolbar: Locator
  readonly toolbarAppreciationButton: Locator
  readonly toolbarSupportButton: Locator
  readonly toolbarCommentButton: Locator
  readonly toolbarBookmarkButton: Locator
  readonly toolbarShareButton: Locator
  readonly toolbarMoreButton: Locator
  readonly toolbarViewLikersButton: Locator
  readonly toolbarViewSupportersButton: Locator
  readonly toolbarIPFSButton: Locator
  readonly toolbarCollectButton: Locator
  readonly toolbarEditButton: Locator

  // dialog
  readonly dialog: Locator
  readonly dialogCommentInput: Locator

  constructor(page: Page, isMobile?: boolean) {
    this.page = page

    // header
    this.translateButton = this.page.getByRole('button', { name: 'Translate' })
    this.ipfsButton = this.page.getByRole('button', { name: 'IPFS' })

    // content
    this.title = this.page.getByRole('heading', { level: 1 })
    this.summary = this.page.getByTestId(TEST_ID.ARTICLE_SUMMARY)
    this.content = this.page.getByTestId(TEST_ID.ARTICLE_CONTENT)
    this.tagList = this.page.getByTestId(TEST_ID.ARTICLE_TAGS)
    this.collection = this.page.getByTestId(TEST_ID.ARTICLE_COLLECTION)
    this.license = this.page.getByTestId(TEST_ID.ARTICLE_LICENSE)
    this.supportButton = this.page.getByTestId(
      TEST_ID.ARTICLE_SUPPORT_SUPPORT_BUTTON
    )
    this.supportRequest = this.page.getByTestId(TEST_ID.ARTICLE_SUPPORT_REQUEST)
    this.supportReply = this.page.getByTestId(TEST_ID.ARTICLE_SUPPORT_REPLY)
    this.viewSupportersButton = this.page.getByRole('button', {
      name: 'All supporters',
    })

    // comment
    this.toggleArticleOnly = this.page.getByLabel('Articles Only')

    // toolbar
    this.toolbar = this.page.getByTestId(TEST_ID.ARTICLE_TOOLBAR)
    this.toolbarAppreciationButton = this.page.getByRole('button', {
      name: 'like article',
    })
    this.toolbarSupportButton = this.page.getByRole('button', {
      name: 'support author',
    })

    this.toolbarCommentButton = this.page.getByRole('button', {
      name: 'Comment…',
    })
    this.toolbarBookmarkButton = this.page.getByTestId(TEST_ID.ARTICLE_BOOKMARK)
    this.toolbarShareButton = this.page.getByRole('button', { name: 'Share' })
    this.toolbarMoreButton = this.toolbar.getByRole('button', {
      name: 'More Action',
    })
    this.toolbarViewLikersButton = this.page.getByRole('menuitem', {
      name: 'Likers',
    })
    this.toolbarViewSupportersButton = this.page.getByRole('menuitem', {
      name: 'Supports',
    })
    this.toolbarIPFSButton = this.page.getByRole('menuitem', { name: 'IPFS' })
    this.toolbarCollectButton = this.page.getByRole('menuitem', {
      name: 'Collect Article',
    })
    this.toolbarEditButton = this.page.getByRole('menuitem', {
      name: 'Edit',
    })

    // dialog
    this.dialog = this.page.getByRole('dialog')
    this.dialogCommentInput = this.dialog.locator('.tiptap')
  }

  async getTitle() {
    return this.title.innerText()
  }

  async getSummary() {
    await this.summary.waitFor({ state: 'visible' })
    return this.summary.innerText()
  }

  async getTags() {
    await this.tagList.waitFor({ state: 'visible' })
    return (await this.tagList.innerText())
      .split(/\s/)
      .map((t) => t.trim())
      .filter((t) => !!t)
  }

  async getFirstCollectionArticleTitle() {
    await this.collection.waitFor({ state: 'visible' })
    return this.collection
      .getByRole('listitem')
      .getByRole('heading')
      .first()
      .innerText()
  }

  async getSupportRequest() {
    await this.supportRequest.waitFor({ state: 'visible' })
    return this.supportRequest.innerText()
  }

  async getLicense() {
    await this.license.waitFor({ state: 'visible' })
    const licenseText = stripSpaces(await this.license.innerText()) as string

    return (
      {
        'NO RIGHTS RESERVED': 'CC0 License',
        'CC BY-NC-ND 2.0': 'CC BY-NC-ND 2.0 License',
        'ALL RIGHTS RESERVED': 'All Rights Reserved',
      }[licenseText] || ''
    )
  }

  async sendComment() {
    // Open comment editor
    await this.toolbarCommentButton.click()

    // Fill with content
    const content = generateComment({})
    await this.dialogCommentInput.fill(content)

    // Send
    await this.dialog.getByRole('button', { name: 'Send' }).click()
    await waitForAPIResponse({
      page: this.page,
      path: 'data.putComment.id',
    })

    return content
  }

  async sendAppreciation(count: number) {
    _range(count).map(async () => await this.toolbarAppreciationButton.click())
  }

  async sendBookmark() {
    await Promise.all([
      waitForAPIResponse({
        page: this.page,
        path: 'data.toggleSubscribeArticle.subscribed',
      }),
      this.toolbarBookmarkButton.click(),
    ])
  }

  async forkArticle() {
    await this.toolbarMoreButton.click()
    await this.toolbarCollectButton.click()
  }

  async editArticle() {
    await this.toolbarMoreButton.click()
    await this.toolbarEditButton.click()
  }

  async supportHKD(password: string, amount: number) {
    // Open support dialog
    await this.supportButton.click()
    await this.page.waitForLoadState('networkidle')

    // select fiat currency
    await this.dialog.getByRole('button', { name: 'Fiat Currency' }).click()
    await this.page.waitForLoadState('networkidle')

    // top-up
    await this.dialog.getByRole('button', { name: 'Top Up' }).click()
    await this.page.waitForLoadState('networkidle')
    await this.dialog
      .getByLabel('Enter amount')
      .fill(Math.max(20, amount).toString())
    await this.dialog.locator('#field-checkout').click() // activate form to fillable
    await this.dialog
      .frameLocator('iframe')
      .getByPlaceholder('Card number')
      .fill('4242424242424242')
    const YY = new Date(Date.now()).getFullYear() - 2000 + 1
    await this.dialog
      .frameLocator('iframe')
      .getByPlaceholder('MM / YY')
      .fill(`12${YY}`)
    await this.dialog.frameLocator('iframe').getByPlaceholder('CVC').fill('123')
    await this.dialog.getByRole('button', { name: 'Confirm' }).click()
    await this.dialog.getByRole('button', { name: 'Back to support' }).click()

    // fill amount hkd
    await this.dialog
      .getByPlaceholder('Enter a custom amount')
      .fill(amount.toString())

    // click next step
    await this.dialog.getByRole('button', { name: 'Next' }).click()

    // fill incorrect payment password
    await this.dialog.locator('#field-password-1').fill(password[0])
    await this.dialog.locator('#field-password-2').fill(password[0])
    await this.dialog.locator('#field-password-3').fill(password[0])
    await this.dialog.locator('#field-password-4').fill(password[0])
    await this.dialog.locator('#field-password-5').fill(password[0])
    await this.dialog.locator('#field-password-6').fill(password[0])

    // fill correct payment password
    await this.dialog.locator('#field-password-1').fill(password[0])
    await this.dialog.locator('#field-password-2').fill(password[1])
    await this.dialog.locator('#field-password-3').fill(password[2])
    await this.dialog.locator('#field-password-4').fill(password[3])
    await this.dialog.locator('#field-password-5').fill(password[4])
    await this.dialog.locator('#field-password-6').fill(password[5])
  }
}
