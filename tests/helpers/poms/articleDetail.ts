import { Locator, Page } from '@playwright/test'
import _range from 'lodash/range'

import { FIELD_ID_STRIPE_CHECKOUT, TEST_ID } from '~/common/enums'
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

  // drawer
  readonly drawer: Locator
  readonly drawerCommentInput: Locator

  constructor(page: Page) {
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
    this.toolbarAppreciationButton = this.toolbar.getByRole('button', {
      name: 'like article',
    })
    this.toolbarSupportButton = this.toolbar.getByRole('button', {
      name: 'support author',
    })
    this.toolbarCommentButton = this.toolbar.getByRole('button', {
      name: 'Comment…',
    })
    this.toolbarBookmarkButton = this.toolbar.getByTestId(
      TEST_ID.ARTICLE_BOOKMARK
    )
    this.toolbarShareButton = this.toolbar.getByRole('button', {
      name: 'Share',
    })
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
    this.toolbarEditButton = this.page.getByRole('link', { name: 'Edit' })

    // drawer
    this.drawer = this.page.getByTestId(TEST_ID.DRAWER)
    this.drawerCommentInput = this.drawer.locator('.tiptap.ProseMirror')
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
        'CC BY-NC-ND 4.0': 'CC BY-NC-ND 4.0 License',
        'ALL RIGHTS RESERVED': 'All Rights Reserved',
      }[licenseText] || ''
    )
  }

  async sendComment() {
    // Open comment editor
    await this.toolbarCommentButton.click()

    // Fill with content
    const content = generateComment({})
    await this.drawerCommentInput.fill(content)

    // Send
    await this.drawer.getByRole('button', { name: 'Publish' }).click()
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
        path: 'data.toggleBookmarkArticle.followed',
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

    // top-up
    await this.drawer.getByRole('button', { name: 'Top Up' }).click()
    await this.page.waitForLoadState('networkidle')
    await this.drawer
      .getByLabel('Enter amount')
      .fill(Math.max(20, amount).toString())
    await this.drawer.locator(`#${FIELD_ID_STRIPE_CHECKOUT}`).click() // activate form to fillable
    await this.drawer
      .locator('iframe')
      .contentFrame()
      .getByRole('textbox', { name: 'Credit or debit card number' })
      .fill('4242424242424242')
    const YY = new Date(Date.now()).getFullYear() - 2000 + 1
    await this.drawer
      .locator('iframe')
      .contentFrame()
      .getByRole('textbox', { name: 'Credit or debit card expiration date' })
      .fill(`12${YY}`)
    await this.drawer
      .locator('iframe')
      .contentFrame()
      .getByRole('textbox', { name: 'Credit or debit card CVC/CVV' })
      .fill('123')
    await this.drawer.getByRole('button', { name: 'Confirm' }).click()
    await this.page.waitForLoadState('networkidle')

    // fill amount hkd
    await this.drawer
      .getByPlaceholder('Enter the amount')
      .fill(amount.toString())

    // click next step
    await this.drawer.getByRole('button', { name: 'Next' }).click()

    // fill incorrect payment password
    await this.drawer.locator('#field-password-0').fill(password[0])
    await this.drawer.locator('#field-password-1').fill(password[0])
    await this.drawer.locator('#field-password-2').fill(password[0])
    await this.drawer.locator('#field-password-3').fill(password[0])
    await this.drawer.locator('#field-password-4').fill(password[0])
    await this.drawer.locator('#field-password-5').fill(password[0])

    // fill correct payment password
    await this.drawer.locator('#field-password-0').fill(password[0])
    await this.drawer.locator('#field-password-1').fill(password[1])
    await this.drawer.locator('#field-password-2').fill(password[2])
    await this.drawer.locator('#field-password-3').fill(password[3])
    await this.drawer.locator('#field-password-4').fill(password[4])
    await this.drawer.locator('#field-password-5').fill(password[5])
  }
}
