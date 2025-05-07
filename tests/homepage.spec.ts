import { expect, test } from '@playwright/test'

import { stripSpaces } from '~/common/utils/text'

import { HomePage } from './helpers'

test.describe('Homepage', () => {
  test('has paginated article feed', async ({ page }) => {
    const home = new HomePage(page)
    await home.goto()

    // Expect title to be "Matters"
    await expect(page).toHaveTitle(/Matters/)

    // Expect home feed has articles
    const articleCount = await home.feedArticles.count()
    expect(articleCount).toBeGreaterThan(0)
    await expect(home.feedArticles.first()).toBeVisible()
  })

  test('has article feed and can switch to latest feed', async ({ page }) => {
    const home = new HomePage(page)
    await home.goto()

    // Expect home feed is a "Trending" feed
    expect(await home.tabTrending.getAttribute('aria-selected')).toBe('true')

    // Switch to "Latest" feed
    await home.tabLatest.click()

    // Expect home feed is a "Latest" feed and has articles
    expect(await home.tabLatest.getAttribute('aria-selected')).toBe('true')
    await expect(home.feedArticles.first()).toBeVisible()
  })

  test('sidebar tags and users can be shuffled', async ({ page }) => {
    const home = new HomePage(page)
    await home.goto()

    // Expect the sidebar has recommended tags
    const firstTag = home.sidebarTags.first()
    await expect(firstTag).toBeVisible()

    // Expect the sidebar has recommended users
    const firstUser = home.sidebarUsers.first()
    const firstUserText = await firstUser.innerText()
    await expect(firstUser).toBeVisible()

    // Can shuffle recommended users
    await home.shuffleSidebarUsers()
    const newFirstUser = home.sidebarUsers.first()
    const newFirstUserText = await newFirstUser.innerText()
    expect(stripSpaces(firstUserText)).not.toEqual(
      stripSpaces(newFirstUserText)
    )
  })
})
