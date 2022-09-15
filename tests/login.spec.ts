import { expect, Page, test } from '@playwright/test'

test.beforeEach(async ({page}) => {
        await page.goto('https://web-develop.matters.news')
      })    

  const testEmail = process.env.MATTERS_TESTING_ACCOUNT_EMAIL ?? '';
  const testPassword = process.env.MATTERS_TESTING_ACCOUNT_PASSWORD ?? '';

const login = async (email: string, password: string, page: Page) => {

    await page.locator('section:has-text("Continue with EmailUser registered by email can login and enable wallet login la")').nth(3).click();
    // Click [placeholder="Email"]
    await page.locator('[placeholder="Email"]').click();
    // Fill [placeholder="Email"]
    await page.locator('[placeholder="Email"]').fill(email);
    // Click [placeholder="Password"]
    await page.locator('[placeholder="Password"]').click();
    // Fill [placeholder="Password"]
    await page.locator('[placeholder="Password"]').fill(password);
    // Click button:has-text("Confirm")
    await page.locator('button:has-text("Confirm")').click();
    await expect(page).toHaveURL('https://web-develop.matters.news/');  
    // Click nav[role="navigation"] >> text=Notification
    await page.locator('nav[role="navigation"] >> text=Notification').click();
    await expect(page).toHaveURL('https://web-develop.matters.news/me/notifications');
  }

test('Model login', async ({ page }) => {

  // Click button:has-text("Enter")
  await page.locator('button:has-text("Enter")').click();

  await login(testEmail, testPassword, page)

});

test('Page login', async ({ page }) => {

  await page.goto('https://web-develop.matters.news/signup?target=https%3A%2F%2Fweb-develop.matters.news%2F')

  await login(testEmail, testPassword, page)

});