import { expect, test } from '@playwright/test'
// import { Base64 } from 'js-base64'

test.beforeEach(async ({page}) => {
        await page.goto('https://web-next.matters.news/')
      })    


test('login and create, with likeid already exists', async ({ page }) => {

  // Click button:has-text("Enter")
  await page.locator('button:has-text("Enter")').click();
  // Click section:has-text("Continue with EmailUser registered by email can login and enable wallet login la") >> nth=3
  await page.locator('section:has-text("Continue with EmailUser registered by email can login and enable wallet login la")').nth(3).click();
  // Click [placeholder="Email"]
  await page.locator('[placeholder="Email"]').click();
  // Fill [placeholder="Email"]
  await page.locator('[placeholder="Email"]').fill('Your email address');
  // Click [placeholder="Password"]
  await page.locator('[placeholder="Password"]').click();
  // Fill [placeholder="Password"]
  await page.locator('[placeholder="Password"]').fill('Your password');
  // Click button:has-text("Confirm")
  await page.locator('button:has-text("Confirm")').click();
  await expect(page).toHaveURL('https://web-next.matters.news/');
  // Click button:has-text("Create")
  await page.locator('button:has-text("Create")').click()
  // await page.locator('button:has-text("Create")').click();
  await expect(page).toHaveURL(new RegExp('^https://web-next.matters.news/me/drafts/'));
  // Click [placeholder="Enter title \.\.\."]
  await page.locator('[placeholder="Enter title \\.\\.\\."]').click();
  // Fill [placeholder="Enter title \.\.\."]
  await page.locator('[placeholder="Enter title \\.\\.\\."]').fill('playwright');
  // Click [aria-label="Enter summary \.\.\."]
  await page.locator('[aria-label="Enter summary \\.\\.\\."]').click();
  // Fill [aria-label="Enter summary \.\.\."]
  await page.locator('[aria-label="Enter summary \\.\\.\\."]').fill('hiiiiiii');
  // Click .ql-editor
  await page.locator('.ql-editor').click();
  await page.locator('.ql-editor').fill('噢噢噢噢噢噢噢噢噢');
  // Click button:has-text("Publish")
  await page.locator('button:has-text("Publish")').click();
  // Click button:has-text("Publish Now")
  await page.locator('button:has-text("Publish Now")').click();
  // Click div[role="dialog"] button:has-text("Publish")
  await page.locator('div[role="dialog"] button:has-text("Publish")').click();
  // Click button:has-text("View article")
  await page.locator('button:has-text("View article")').click()
  await expect(page).toHaveURL(new RegExp('^https://web-next.matters.news/@username'));
   
  // Click button:has-text("IPFS")
  await page.locator('button:has-text("IPFS")').click();
  await page.locator('text=Content HashThe Fingerprint from IPFS, you can read it via a gateway >> button').click();
  
  // Check if content hash exists
  const contentHash = await (page.$(".copy >> input")).then( (value) => value?.inputValue())
  expect(contentHash).not.toEqual(null)

  // Check if there's any available gateway
  const gatewayUrl = await page.locator('.gateway-url').first().innerText()
  expect(gatewayUrl).not.toBeNull()

});
