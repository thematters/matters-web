const { client } = require('nightwatch-api')
const { Given, Then, When } = require('cucumber')

const PATH = require('../common/enums/path')
const TIME = require('../common/enums/time')

Given('I visit matters.news home page', () => {
  return client
    .url(PATH.HOME(`${process.env.BDD_USER}:${process.env.BDD_PASSWD}@`))
    .waitForElementVisible('body')
    .waitForElementVisible('header', 10 * TIME.SECOND)
    .waitForElementVisible('main')
})

Then('the Matters Today title should be visible', () => {
  return client.assert.visible('h2.feature')
})

Then('the Matters Today description should visible', () => {
  return client.assert.visible('div.description')
})

When("I click the Matters Today's cover", () => {
  return client
    .moveToElement('div.cover-container', 0, 0)
    .click('div.cover-container')
    .pause(10 * TIME.SECOND)
})

Then('the Article page should be visible', () => {
  return client
    .waitForElementVisible('body')
    .waitForElementVisible('h1.article')
})
