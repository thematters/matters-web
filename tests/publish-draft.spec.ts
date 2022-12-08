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
    const [summary, tags, , collectedArticles, supportSetting, license, , ,] =
      await fuzzingRun({
        funcs: [
          () => draftDetail.fillSummary(),
          () => draftDetail.setTags(),
          () => draftDetail.setCover(),
          () => draftDetail.setCollection(),
          () => draftDetail.setSupportSetting({}),
          () => draftDetail.setLicense({}),
          () => draftDetail.toggleAddToCicle({}),
          () => draftDetail.toggleISCN({}),
        ],
      })

    // Publish
    await draftDetail.publish()

    // Goto published article page
    await draftDetail.dialogViewArticleButton.click()
    await page.waitForNavigation()

    // Expect article data are same as previous draft inputs
    const articleDetail = new ArticleDetailPage(page)

    const articleTitle = await articleDetail.title.innerText()
    expect(articleTitle).toBe(title)

    const articleContent = await articleDetail.content.innerText()
    expect(articleContent).toBe(content)

    const articleSummary = await articleDetail.getSummary()
    if (summary) {
      expect(articleSummary).toBe(summary)
    }

    const articleTags = await articleDetail.getTags()
    if (tags && tags.length > 0) {
      expect(articleTags.sort().join(',')).toBe(tags.sort().join(','))
    }

    const articleFirstCollectedArticle =
      await articleDetail.getFirstCollectedArticle()
    if (collectedArticles && collectedArticles.length > 0) {
      expect(articleFirstCollectedArticle).toBe(collectedArticles[0])
    }

    const articleSupportRequest = await articleDetail.getSupportRequest()
    if (supportSetting?.requestForDonationText) {
      expect(articleSupportRequest).toBe(supportSetting.requestForDonationText)
    }

    const articleLicense = await articleDetail.getLicense()
    if (license) {
      expect(articleLicense).toBe(license)
    }
  })
})
