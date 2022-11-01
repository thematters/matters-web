import { test, expect }from '@playwright/test';

test('send comment', async ({ page }) => {

  // Go to https://web-dev.matters.news/
  await page.goto('https://web-dev.matters.news/');

  // Click button:has-text("Enter")
  await page.locator('button:has-text("Enter")').click();

  // Click section:has-text("Continue with WalletFor unregistered or users enabled wallet login") >> nth=3
  await page.locator('section:has-text("Continue with WalletFor unregistered or users enabled wallet login")').nth(3).click();

  // Click [aria-label="Previous"]
  await page.locator('[aria-label="Previous"]').click();

  // Click section:has-text("Continue with EmailUser registered by email can login and enable wallet login la") >> nth=3
  await page.locator('section:has-text("Continue with EmailUser registered by email can login and enable wallet login la")').nth(3).click();

  // Click [placeholder="Email"]
  await page.locator('[placeholder="Email"]').click();

  // Fill [placeholder="Email"]
  await page.locator('[placeholder="Email"]').fill('jl+11@matters.news');
  // Click [placeholder="Password"]
  await page.locator('[placeholder="Password"]').click();
  // Fill [placeholder="Password"]
  await page.locator('[placeholder="Password"]').fill('12345678');
  // Click button:has-text("Confirm")
  await page.locator('button:has-text("Confirm")').click();
  await expect(page).toHaveURL('https://web-dev.matters.news/');


  // Click [aria-label="Go to \/\@dev_testing\/7441-hello-world-bafyreia6bvd6jxphgxqrbnzqb7x5oyw44fdsyfn7tdx43u2uhx3o32biz4\?utm_source\=homepage_hottest"]
  await page.locator('[aria-label="Go to \\/\\@dev_testing\\/7441-hello-world-bafyreia6bvd6jxphgxqrbnzqb7x5oyw44fdsyfn7tdx43u2uhx3o32biz4\\?utm_source\\=homepage_hottest"]').click();
  await expect(page).toHaveURL('https://web-dev.matters.news/@dev_testing/7437-hello-world-bafyreia6bvd6jxphgxqrbnzqb7x5oyw44fdsyfn7tdx43u2uhx3o32biz4');

  // Click text=Comment…
  await page.locator('text=Comment…').click();


  // Click .ql-editor
  await page.locator('.ql-editor').click();
  await page.locator('.ql-editor').fill('第一次测试');

  // Click button:has-text("送出")
  await page.locator('button:has-text("Send")').click();


});