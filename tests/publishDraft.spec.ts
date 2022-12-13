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
      ,
      collectedArticleTitle,
      supportSetting,
      license,
      ,
      ,
    ] = (await fuzzingRun({
      funcs: [
        () => draftDetail.fillSummary(),
        () => draftDetail.setTags(),
        () => draftDetail.setCover(),
        () => draftDetail.setCollection(),
        () => draftDetail.setSupportSetting({}),
        () => draftDetail.setLicense({}),
        () => draftDetail.checkAddToCicle(),
        () => draftDetail.checkISCN(),
      ],
    })) as [
      string | undefined,
      string[] | undefined,
      boolean | undefined,
      string[] | undefined,
      (
        | {
            replyToDonatorText?: boolean
            requestForDonationText?: boolean
          }
        | undefined
      ),
      string | undefined,
      boolean | undefined,
      boolean | undefined
    ]

    // Publish
    await draftDetail.publish()

    // Goto published article page
    await Promise.all([
      draftDetail.dialogViewArticleButton.click(),
      page.waitForNavigation(),
    ])

    // Expect article data are same as previous draft inputs
    const articleDetail = new ArticleDetailPage(page)

    const articleTitle = await articleDetail.title.innerText()
    expect(articleTitle).toBe(title)

    const articleContent = await articleDetail.content.innerText()
    expect(articleContent).toBe(content)

    if (summary) {
      const articleSummary = await articleDetail.getSummary()
      expect(articleSummary).toBe(summary)
    }

    if (tags && tags.length > 0) {
      const articleTags = await articleDetail.getTags()
      expect(articleTags.sort().join(',')).toBe(tags.sort().join(','))
    }

    if (collectedArticleTitle) {
      const firstCollectionArticleTitle =
        await articleDetail.getFirstCollectionArticleTitle()
      expect(firstCollectionArticleTitle).toBe(collectedArticleTitle)
    }

    if (supportSetting?.requestForDonationText) {
      const articleSupportRequest = await articleDetail.getSupportRequest()
      expect(articleSupportRequest).toBe(supportSetting.requestForDonationText)
    }

    if (license) {
      const articleLicense = await articleDetail.getLicense()
      expect(articleLicense).toBe(license)
    }
  })
})
