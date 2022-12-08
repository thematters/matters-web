import { expect, test } from '@playwright/test'

import {
  ArticleDetailPage,
  authedTest,
  DraftDetailPage,
  fuzzingRun,
} from './helpers'

test.describe('Publish draft', () => {
  authedTest('can create and publish draft', async ({ alicePage: page }) => {
    const draftDetail = new DraftDetailPage(page)
    await draftDetail.createDraft()

    // Required: Fill title and content
    const title = await draftDetail.fillTitle()
    const content = await draftDetail.fillContent()

    // Optional
    const [
      summary,
      tags,
      cover,
      collectedArticles,
      supportSetting,
      license,
      isAddedToCircle,
      isISCN,
    ] = await fuzzingRun({
      funcs: [
        draftDetail.fillSummary,
        draftDetail.setTags,
        draftDetail.setCover,
        draftDetail.setCollection,
        () => draftDetail.setSupportSetting({}),
        () => draftDetail.setLicense({}),
        () => draftDetail.toggleAddToCicle({}),
        () => draftDetail.toggleISCN({}),
      ],
    })

    console.log({
      summary,
      tags,
      cover,
      collectedArticles,
      supportSetting,
      license,
      isAddedToCircle,
      isISCN,
    })

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
    expect(articleTitle).toBe(title)
    expect(articleSummary).toBe(summary)
    expect(articleContent).toBe(content)
  })
})
