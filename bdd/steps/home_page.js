const { client } = require('nightwatch-api')
const { Given, Then, When } = require('cucumber')

const PATH = require('../common/enums/path')
const SCRIPT = require('../common/enums/script')
const TIME = require('../common/enums/time')

/*----- Common Steps -----*/

Given('I visit home page', () => {
  return client
    .fullscreenWindow()
    .url(PATH.HOME(`${process.env.BDD_USER}:${process.env.BDD_PASSWD}@`))
    .waitForElementVisible('body')
    .waitForElementVisible('header')
    .waitForElementVisible('main')
})

Then('the Article page should be visible', () => {
  return client
    .waitForElementVisible('body')
    .waitForElementVisible('h1.article', 10 * TIME.SECOND)
})

/*----- Matters Today -----*/

Then('the Matters Today title should be visible', () => {
  return client.assert.visible('h2.feature')
})

Then('the Matters Today description should visible', () => {
  return client.assert.visible('div.description')
})

When("I click the Matters Today's cover", () => {
  return client
    .click('div.cover-container')
    .pause(2 * TIME.SECOND)
})

/*----- Hottest Feed -----*/

Then('the hottest list should be visible', () => {
  const query = 'main > article > div > ul'
  return client
    .waitForElementVisible(`${query}`)
    .expect.elements(`${query} > li`).count.to.equal(10)
})

Then('the article title and description in hottest list should be visible', () => {
  const query = 'main > article > div > ul > li:first-child > section > div'
  return client
    .assert.visible(`${query} > div.title > a > h2.feed`)
    .assert.visible(`${query} > div.description`)
})

When('I scroll down the page', () => {
  return client
    .execute(SCRIPT.SCROLL_BOTTOM)
    .pause(2 * TIME.SECOND)
})

Then('more hottest articles are loaded', () => {
  return client
    .expect.elements('main > article > div > ul > li').count.to.equal(20)
})

/*----- ICYMI Feed -----*/

Then('the ICYMI list should be visible', () => {
  const query = 'main > aside > section:first-child > ul'
  return client
    .assert.visible(`${query}`)
    .expect.elements(`${query} > li`).count.not.to.equal(0)
})

Then('the article title in ICYMI list should be visible', () => {
  return client
    .assert.visible('main > aside > section:first-child > ul > li:first-child > section > div > div > a > h2.sidebar')
})

When('I click the ICYMI article title', () => {
  return client
    .execute(SCRIPT.SCROLL_TOP)
    .click('main > aside > section:first-child > ul > li:first-child > section > div > div > a')
    .pause(2 * TIME.SECOND)
})

/*----- Topics Feed -----*/

Then('the topics list should be visible', () => {
  const query = 'main > aside > section:nth-child(2) > ol'
  return client
    .assert.visible(`${query}`)
    .expect.elements(`${query} > li`).count.not.to.equal(0)
})

Then('the article title in topics list should be visible', () => {
  return client
    .assert.visible('main > aside > section:nth-child(2) > ol > li > section > div > div > a > h2.sidebar')
})

When('I click the topics article title', () => {
  return client
    .execute(SCRIPT.SCROLL_TOP)
    .click('main > aside > section:nth-child(2) > ol > li > section > div > div > a')
    .pause(2 * TIME.SECOND)
})

/*----- Authors Feed -----*/

Then('the authors list should be visible', () => {
  const query = 'main > aside > section:nth-child(3) > ul'
  return client
    .assert.visible(`${query}`)
    .expect.elements(`${query} > li`).count.not.to.equal(0)
})

Then('the author name in auhtors list should be visible', () => {
  return client
    .assert.visible('main > aside > section:nth-child(3) > ul > li:first-child > section > section > a')
})

When('I click the authors name', () => {
  return client
    .click('main > aside > section:nth-child(3) > ul > li:first-child > section > section > a')
    .pause(2 * TIME.SECOND)
})

Then('the User page should be visible', () => {
  return client
    .waitForElementVisible('body')
    .waitForElementVisible('main > section > div:nth-child(2)', 10 * TIME.SECOND)
})

/*----- Tags Feed -----*/

Then('the tags list should be visible', () => {
  const query = 'main > aside > section:nth-child(4) > ul'
  return client
    .assert.visible(`${query}`)
    .expect.elements(`${query} > li`).count.not.to.equal(0)
})

Then('the tag name in tags list should be visible', () => {
  return client
    .assert.visible('main > aside > section:nth-child(4) > ul > li:first-child > a')
})

When('I click the tags name', () => {
  return client
    .click('main > aside > section:nth-child(4) > ul > li:first-child > a')
    .pause(2 * TIME.SECOND)
})

Then('the Tag page should be visible', () => {
  return client
    .waitForElementVisible('body')
    .waitForElementVisible('main > article > header > section.title', 10 * TIME.SECOND)
})
