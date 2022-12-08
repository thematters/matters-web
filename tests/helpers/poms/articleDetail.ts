import { Locator, Page } from '@playwright/test'

import { TEST_ID } from '~/common/enums'

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

  // dialog
  readonly dialog: Locator

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
    this.supportButton = this.page.getByRole('button', {
      name: 'Support Author',
    })
    this.supportRequest = this.page.getByTestId(TEST_ID.ARTICLE_SUPPORT_REQUEST)
    this.supportReply = this.page.getByTestId(TEST_ID.ARTICLE_SUPPORT_REPLY)
    this.viewSupportersButton = this.page.getByRole('button', {
      name: 'All supporters',
    })

    // comment
    this.toggleArticleOnly = this.page.getByLabel('Articles Only')

    // toolbar
    this.toolbarAppreciationButton = this.page.getByRole('button', {
      name: 'appreciate article',
    })
    this.toolbarSupportButton = this.page.getByRole('button', {
      name: 'support author',
    })
    this.toolbarCommentButton = this.page.getByRole('button', {
      name: 'Comment',
    })
    this.toolbarBookmarkButton = this.page.getByRole('button', {
      name: 'Bookmark',
    })
    this.toolbarShareButton = this.page.getByRole('button', { name: 'Share' })
    this.toolbarMoreButton = this.page.getByRole('button', {
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

    // dialog
    this.dialog = this.page.getByRole('dialog')
  }

  async goto() {
    await this.page.goto('https://playwright.dev')
  }

  async getSummary() {
    if (!(await this.summary.isVisible())) {
      return ''
    }
    return this.summary.innerText()
  }

  async getTags() {
    if (!(await this.tagList.isVisible())) {
      return []
    }
    return (await this.tagList.innerText()).split(/\s/).map((t) => t.trim())
  }

  async getFirstCollectedArticle() {
    if (!(await this.collection.isVisible())) {
      return []
    }

    return this.collection
      .getByRole('listitem')
      .getByRole('heading')
      .innerText()
  }

  async getSupportRequest() {
    if (!(await this.supportRequest.isVisible())) {
      return []
    }
    return this.supportRequest.innerText()
  }

  async getLicense() {
    if (!(await this.license.isVisible())) {
      return []
    }
    return this.license.innerText()
  }
}
