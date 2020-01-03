const { client } = require('nightwatch-api')
const { Given, Then, When } = require('cucumber')

const PATH = require('../common/enums/path')
const TIME = require('../common/enums/time')

const waitPageToBeVisible = (client, query) => {
  return client
    .waitForElementVisible('body')
    .waitForElementVisible(query, 10 * TIME.SECOND)
}

Given('I visit home page', () => {
  return client
    .fullscreenWindow()
    .url(PATH.HOME(`${process.env.BDD_USER}:${process.env.BDD_PASSWD}@`))
    .waitForElementVisible('body')
    .waitForElementVisible('header')
    .waitForElementVisible('main')
})

Then('the Article page should be visible', () => {
  return waitPageToBeVisible(client, 'h1.article')
})

Then('the User page should be visible', () => {
  return waitPageToBeVisible(client, 'main > section > div:nth-child(2)')
})

Then('the Tag page should be visible', () => {
  return waitPageToBeVisible(client, 'main > article > header > section.title')
})
