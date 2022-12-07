import { expect, test } from '@playwright/test'

import {
  ArticleDetailPage,
  authedTest,
  DraftDetailPage,
  generateContent,
  generateSummary,
  generateTitle,
} from '../utils'

test.describe('Publish draft', () => {
  authedTest('can create and publish draft', async ({ alicePage: page }) => {
    const draftDetail = new DraftDetailPage(page)
    await draftDetail.createDraft()

    // Fill title, summary and content
    const title = generateTitle()
    const summary = generateSummary()
    const content = generateContent({})
    console.log({ title, summary, content })
    await draftDetail.titleInput.fill(title)
    await draftDetail.summaryInput.fill(summary)
    await draftDetail.contentInput.fill(content)

    // Publish
    await draftDetail.publish()

    // Goto published article page
    await draftDetail.dialogViewArticleButton.click()

    // Expect article title, summary and content are same as previous inputs
    const articleDetail = new ArticleDetailPage(page)
    const [articleTitle, articleSummary, articleContent] = await Promise.all([
      await articleDetail.title.innerText(),
      await articleDetail.summary.innerText(),
      await articleDetail.content.innerText(),
    ])
    console.log({ articleTitle, articleSummary, articleContent })
    expect(articleTitle).toBe(title)
    expect(articleSummary).toBe(summary)
    expect(articleContent).toBe(content)
  })
})
