import { expect, test }from '@playwright/test';

// developer@matters.news account 
const aliceEmail = 'developer@matters.news' ?? '';
const alicePassword = 'hSl6pTnd31*451pq' ?? '';

// developer+1@matters.news account
const bobEmail = 'developer+1@matters.news' ?? '';
const bobPassword = 'AAfSTzS7Y8gdwNGj' ?? '';

test('send comment and check comment notice', async ({ page }) => {

  const randomComment = Math.random().toString(36).slice(2, 7);

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
  await page.locator('[placeholder="Email"]').fill('developer@matters.news');
  // Click [placeholder="Password"]
  await page.locator('[placeholder="Password"]').click();
  // Fill [placeholder="Password"]
  await page.locator('[placeholder="Password"]').fill('hSl6pTnd31*451pq');
  // Click button:has-text("Confirm")
  await page.locator('button:has-text("Confirm")').click();
  await expect(page).toHaveURL('https://web-dev.matters.news/');

  await page.waitForTimeout(5000)
  await page.goto('https://web-dev.matters.news/@developer1/7624-test-comment-reply-article-bafyreigl3h5wmormhjpl5mcrimpqkc3efjixrkcw7d7dzxmhfxda3kmsqy');
   // Click text=Comment…
  await page.locator('text=Comment…').click();


  // Click .ql-editor
  await page.locator('.ql-editor').click();
  await page.locator('.ql-editor').fill(randomComment);

  // Click button:has-text("送出")
  await page.locator('button:has-text("Send")').click();


  await page.goto('https://web-dev.matters.news/');

  // Click button:has-text("My Page")
  await page.locator('button:has-text("My Page")').click();
  // Click section:has-text("Log Out") >> nth=1
  await page.locator('section:has-text("Log Out")').nth(1).click();
  await expect(page).toHaveURL('https://web-dev.matters.news/');

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
  await page.locator('[placeholder="Email"]').fill('developer+1@matters.news');
  // Click [placeholder="Password"]
  await page.locator('[placeholder="Password"]').click();
  // Fill [placeholder="Password"]log
  
  await page.locator('[placeholder="Password"]').fill(bobEmail);
  // Click button:has-text("Confirm")
  await page.locator('button:has-text("Confirm")').click();
  await expect(page).toHaveURL('https://web-dev.matters.news/');
  // Click text=通知
  await page.locator('text=Notifications').click();
  await expect(page).toHaveURL('https://web-dev.matters.news/me/notifications');
  // Click text=randomComment >> nth=1
  await page.locator(`text='${randomComment}'`).nth(1).click();
  await expect(page).toHaveURL(new RegExp('^https://web-dev.matters.news/@developer1/7624-test-comment-reply-article-bafyreigl3h5wmormhjpl5mcrimpqkc3efjixrkcw7d7dzxmhfxda3kmsqy'));
});





test('comment reply and check reply notice', async ({ page }) => {

  const randomReply = Math.random().toString(36).slice(2, 9);

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
  await page.locator('[placeholder="Email"]').fill(aliceEmail);
  // Click [placeholder="Password"]
  await page.locator('[placeholder="Password"]').click();
  // Fill [placeholder="Password"]
  await page.locator('[placeholder="Password"]').fill(alicePassword);
  // Click button:has-text("Confirm")
  await page.locator('button:has-text("Confirm")').click();
  await expect(page).toHaveURL('https://web-dev.matters.news/');
  
  await page.waitForTimeout(3000)
  await page.goto('https://web-dev.matters.news/@developer1/7624-test-comment-reply-article-bafyreigl3h5wmormhjpl5mcrimpqkc3efjixrkcw7d7dzxmhfxda3kmsqy');
   
  // Click [aria-label="Write a comment"]
  await page.locator(('[aria-label="Write a comment"] >> nth=0')).click();


  await page.locator('.ql-editor').click();
  await page.locator('.ql-editor').fill(randomReply);

  // Click button:has-text("Send")
  await page.locator('button:has-text("Send")').click();
  // Click text=reply0
  await page.locator('text=reply0').click();
  // Click button:has-text("My Page")
  await page.locator('button:has-text("My Page")').click();
  // Click text=Log Out
  await page.locator('text=Log Out').click();
  await expect(page).toHaveURL('https://web-dev.matters.news/@developer1/7624-test-comment-reply-article-bafyreigl3h5wmormhjpl5mcrimpqkc3efjixrkcw7d7dzxmhfxda3kmsqy');
  await page.waitForTimeout(2000)

    // Go to https://web-dev.matters.news/
  await page.goto('https://web-dev.matters.news/');

  // Click button:has-text("Create")
  await page.locator('button:has-text("Create")').click();
  // Click section:has-text("Continue with EmailUser registered by email can login and enable wallet login la") >> nth=3
  await page.locator('section:has-text("Continue with EmailUser registered by email can login and enable wallet login la")').nth(3).click();
  
  await page.locator('[placeholder="Email"]').click();
  // Fill [placeholder="Email"]
  await page.locator('[placeholder="Email"]').fill(bobEmail);
  // Click [placeholder="Password"]
  await page.locator('[placeholder="Password"]').click();
  // Fill [placeholder="Password"]
  await page.locator('[placeholder="Password"]').fill(bobPassword)

  // Click button:has-text("Confirm")
  await page.locator('button:has-text("Confirm")').click();
  // Click text=Notifications
  await page.locator('text=Notifications').click();
  await expect(page).toHaveURL('https://web-dev.matters.news/me/notifications');
  // Click text=reply0 >> nth=1
  await page.locator(`text=${ randomReply}`).nth(1).click();
  await expect(page).toHaveURL(new RegExp ('^https://web-dev.matters.news/@developer1/7624-test-comment-reply-article-bafyreigl3h5wmormhjpl5mcrimpqkc3efjixrkcw7d7dzxmhfxda3kmsqy#'));
  // Click text=reply0
  await page.locator('text=reply0').click();
});

