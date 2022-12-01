import { expect, test } from '@playwright/test'

import { TEST_ID } from '~/common/enums'

test('homepage has article feed and scrollable', async ({ page }) => {
  await page.goto('/')

  // Expect title to be "Matters"
  await expect(page).toHaveTitle(/Matters/)

  // Expect home feed has articles
  const articles = page.getByTestId(TEST_ID.DIGEST_ARTICLE_FEED)
  const articleCount = await articles.count()
  expect(articleCount).toBeGreaterThan(0)
  await expect(articles.first()).toBeVisible()

  // Scroll to bottom and expect loading more articles
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await page.waitForLoadState('networkidle')
  const newArticles = page.getByTestId(TEST_ID.DIGEST_ARTICLE_FEED)
  const newArticleCount = await newArticles.count()
  expect(newArticleCount).toBeGreaterThan(articleCount)
})

test('homepage has article feed and can switch to latest feed', async ({
  page,
}) => {
  await page.goto('/')

  // Expect home feed is a "Trending" feed
  const trendingTab = page.getByRole('tab').filter({ hasText: 'Trending' })
  expect(await trendingTab.getAttribute('aria-selected')).toBe('true')

  // Switch to "Latest" feed
  const latestTab = page.getByRole('tab').filter({ hasText: 'Latest' })
  await latestTab.click()

  // Expect home feed is a "Latest" feed and has articles
  expect(await latestTab.getAttribute('aria-selected')).toBe('true')
  const latestArticles = page.getByTestId(TEST_ID.DIGEST_ARTICLE_FEED)
  await expect(latestArticles.first()).toBeVisible()
})

test('homepage sidebar has recommended tags and users', async ({ page }) => {
  await page.goto('/')

  // Expect the sidebar has recommended tags
  const tags = page.getByTestId(TEST_ID.DIGEST_TAG_SIDEBAR)
  await expect(tags.first()).toBeVisible()

  // Expect the sidebar has recommended users
  const users = page.getByTestId(TEST_ID.DIGEST_TAG_SIDEBAR)
  await expect(users.first()).toBeVisible()
})
