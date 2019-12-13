const { client } = require('nightwatch-api')
const { Given, Then, When } = require('cucumber')

const { PATH_HOME } = require('../common/enums/path')
const { WAIT_DEFAULT } = require('../common/enums/wait')

Given('I visit matters.news home page', () => {
  return client
    .url(PATH_HOME)
    .waitForElementVisible('body')
    .waitForElementVisible('header')
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
    .pause(WAIT_DEFAULT)
})

Then('the Article page should be visible', () => {
  return client
    .waitForElementVisible('body')
    .waitForElementVisible('h1.article')
})
