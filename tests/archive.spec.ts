import { test, expect } from '@playwright/test';

test('in article archive', async ({ page }) => {

  // Go to https://web-dev.matters.news/
  await page.goto('https://web-dev.matters.news/');

  // Click button:has-text("Enter")
  await page.locator('button:has-text("Enter")').click();

  // Click section:has-text("Continue with EmailUser registered by email can login and enable wallet login la") >> nth=3
  await page.locator('section:has-text("Continue with EmailUser registered by email can login and enable wallet login la")').nth(3).click();

  // Click [placeholder="Password"]
  await page.locator('[placeholder="Password"]').click();

  // Fill [placeholder="Password"]
  await page.locator('[placeholder="Password"]').fill('hSl6pTnd31*451pq');

  // Click [placeholder="Email"]
  await page.locator('[placeholder="Email"]').click();

  // Fill [placeholder="Email"]
  await page.locator('[placeholder="Email"]').fill('developer@matters.news');

  // Click button:has-text("Confirm")
  await page.locator('button:has-text("Confirm")').click();
  await expect(page).toHaveURL('https://web-dev.matters.news/');

  // Click button:has-text("My Page")
  await page.locator('button:has-text("My Page")').click();

  // Click [aria-label="Go to \/\@dev_testing"]
  await page.locator('[aria-label="Go to \\/\\@dev_testing"]').click();
  await expect(page).toHaveURL('https://web-dev.matters.news/@dev_testing');

  // Click text=Hello worlddev@matterstestToday 17:54
  await page.locator('text=Hello worlddev@matterstestToday 17:54').click();
  await expect(page).toHaveURL('https://web-dev.matters.news/@dev_testing/7504-hello-world-bafyreigyiovrkxeeitihgqbekp6z37beaxzibs2vzauhr7vu262ik7l6vi');

  // Click [aria-label="More Actions"]
  await page.locator('[aria-label="More Actions"]').click();

  // Click text=Archive
  await page.locator('text=Archive').click();

  // Click button:has-text("Archive")
  await page.locator('button:has-text("Archive")').click();

  // Click [aria-label="Back"]
  await page.locator('[aria-label="Back"]').click();
  await expect(page).toHaveURL('https://web-dev.matters.news/@dev_testing');

  // Click text=Hello worlddev@matterstestToday 17:54
  await page.locator('text=Hello worlddev@matterstestToday 17:54').click();
  await expect(page).toHaveURL('https://web-dev.matters.news/@dev_testing/7504-hello-world-bafyreigyiovrkxeeitihgqbekp6z37beaxzibs2vzauhr7vu262ik7l6vi');

  // Click section:has-text("This work is archived on Matters.") >> nth=2
  await page.locator('section:has-text("This work is archived on Matters.")').nth(2).click();

});

//test in article list archive