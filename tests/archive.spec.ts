import { expect, test } from '@playwright/test';

test('test archive', async ({ page }) => {

  const testEmail = process.env.MATTERS_TESTING_ACCOUNT_EMAIL ?? '';
  const testPassword = process.env.MATTERS_TESTING_ACCOUNT_PASSWORD ?? '';
  const randomTitle = Math.random().toString(36).slice(2, 9);

  // Go to https://web-dev.matters.news/
  await page.goto('https://web-dev.matters.news/');

  // Click button:has-text("Create")
  await page.locator('button:has-text("Create")').click();

  // Click section:has-text("Continue with EmailUser registered by email can login and enable wallet login la") >> nth=3
  await page.locator('section:has-text("Continue with EmailUser registered by email can login and enable wallet login la")').nth(3).click();

  // Click [placeholder="Email"]
  await page.locator('[placeholder="Email"]').click();

  // Fill [placeholder="Email"]
  await page.locator('[placeholder="Email"]').fill('');


  // Fill [placeholder="Email"]
  await page.locator('[placeholder="Email"]').fill(testEmail);

  // Click [placeholder="Password"]
  await page.locator('[placeholder="Password"]').click();

  // Fill [placeholder="Password"]
  await page.locator('[placeholder="Password"]').fill(testPassword);

  // Click button:has-text("Confirm")
  await page.locator('button:has-text("Confirm")').click();
  await expect(page).toHaveURL('https://web-dev.matters.news/');

  // Click button:has-text("Create")
  await page.locator('button:has-text("Create")').click();
  await expect(page).toHaveURL(new RegExp ('^https://web-dev.matters.news/me/drafts/'));

  // Triple click [placeholder="Enter title \.\.\."]
  await page.locator('[placeholder="Enter title \\.\\.\\."]').click({
    clickCount: 3
  });

  // Fill [placeholder="Enter title \.\.\."]
  await page.locator('[placeholder="Enter title \\.\\.\\."]').fill(randomTitle);

  // Click .ql-editor
  await page.locator('.ql-editor').click();
  await page.locator('.ql-editor').fill(randomTitle);

  // Click button:has-text("Publish")
  await page.locator('button:has-text("Publish")').click();

  // Click button:has-text("Publish Now")
  await page.locator('button:has-text("Publish Now")').click();

  // Click div[role="dialog"] button:has-text("Publish")
  await page.locator('div[role="dialog"] button:has-text("Publish")').click();

  // Click button:has-text("View article")
  await page.locator('button:has-text("View article")').click();
  await expect(page).toHaveURL(new RegExp('^https://web-dev.matters.news/@dev_testing/'));

  // Click [aria-label="More Actions"]
  await page.locator('[aria-label="More Actions"]').click();

  // Click text=Archive
  await page.locator('text=Archive').click();

  // Click button:has-text("Archive")
  await page.locator('button:has-text("Archive")').click();

  // Click [id="__next"] >> text=作品已隱藏
  await page.locator('[id="__next"] >> text=作品已隱藏').click();

});