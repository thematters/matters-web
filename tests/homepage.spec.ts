import { expect, test } from '@playwright/test'

import { stripSpaces } from '~/common/utils/text'

import { HomePage } from './helpers'

test.describe('Homepage', () => {
  test('has article feed in newest feed', async ({ page }) => {
    const home = new HomePage(page)
    await home.goto()

    // Expect title to be "Matters"
    await expect(page).toHaveTitle(/Matters/)

    // Expect home feed has articles
    const articleCount = await home.feedArticles.count()
    expect(articleCount).toBeGreaterThan(0)
    await expect(home.feedArticles.first()).toBeVisible()
  })

  test('can switch to featured feed', async ({ page }) => {
    const home = new HomePage(page)
    await home.goto()

    // Expect home feed is a "Newest" feed
    expect(await home.tabNewest.getAttribute('aria-selected')).toBe('true')

    // Switch to "Featured" feed
    await home.tabFeatured.click()

    // Expect home feed is a "Featured" feed
    expect(await home.tabFeatured.getAttribute('aria-selected')).toBe('true')
  })

  test('sidebar users can be shuffled', async ({ page }) => {
    const home = new HomePage(page)
    await home.goto()

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
