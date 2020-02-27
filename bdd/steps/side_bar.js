const { client } = require('nightwatch-api')
const { Given, Then, When } = require('cucumber')

const PATH = require('../common/enums/path')
const SCRIPT = require('../common/enums/script')
const TIME = require('../common/enums/time')

Then('the Side Bar is visible', () => {
  const query = 'main > aside'
  return client.maximizeWindow().assert.visible(`${query}`)
})

/*----- Cannot Miss -----*/

Given('the Cannot Miss section is visible', () => {
  const query = 'main > aside'
  return client.assert.visible(`${query} > section:nth-child(1)`)
})

When('I click the fisrt article', () => {
  const query =
    'main > aside > section:nth-child(1) > section > section:nth-child(1) > section > section '
  return client.click(`${query} > header > a`).pause(2 * TIME.SECOND)
})

When('I click the first author', () => {
  const query =
    'main > aside > section:nth-child(1) > section > section:nth-child(1) > section > section '
  return client.click(`${query} > footer > a`).pause(2 * TIME.SECOND)
})

/*----- Hashtag list -----*/
When('I scroll down to the hashtag section', () => {
  const query = '#__next > main > aside > section.jsx-1380876058'
  return client.execute(
    `document.querySelector('${query}').scrollIntoView({ block: 'center' })`
  )
})

Given('the hashtag section is visible', () => {
  const query = 'main > aside'
  return client.assert.visible(`${query} > section.jsx-1380876058`)
})

When('I click the first hashtag', () => {
  const query = '#__next > main > aside > section.jsx-1380876058 > ul'
  return client.click(`${query} > li:nth-child(1) > a`).pause(2 * TIME.SECOND)
})

When('I click check all hashtag button', () => {
  const query = '#__next > main > aside > section.jsx-1380876058'
  return client.click(`${query} > header > a`).pause(2 * TIME.SECOND)
})

/*----- Hot topics -----*/
When('I scroll down to the hot topics section', () => {
  const query = '#__next > main > aside > section.jsx-1380876058'
  return client.execute(
    `document.querySelector('${query}').scrollIntoView({ block: 'center' })`
  )
})

Given('the hot topics section is visible', () => {
  const query = 'main > aside'
  return client.assert.visible(`${query} > section:nth-child(3)`)
})

When('I click the first hot topic', () => {
  const query = '#__next > main > aside > section:nth-child(3) > ol'
  return client
    .click(`${query} > li:nth-child(1) > section > section > a`)
    .pause(2 * TIME.SECOND)
})

When('I click the all hot topics button', () => {
  const query = '#__next > main > aside > section:nth-child(3)'
  return client.click(`${query} > header > a`).pause(2 * TIME.SECOND)
})

/*----- Active authors -----*/
When('I scroll down to the active authors section', () => {
  const query = '#__next > main > aside > section:nth-child(4)'
  return client.execute(
    `document.querySelector('${query}').scrollIntoView({ block: 'center' })`
  )
})

Given('the active authors section is visible', () => {
  const query = 'main > aside'
  return client.assert.visible(`${query} > section:nth-child(4)`)
})

When('I click the first active author', () => {
  const query = '#__next > main > aside > section:nth-child(4) > section'
  return client
    .click(`${query} > section:nth-child(1) > section > section`)
    .pause(2 * TIME.SECOND)
})

When('I click the follow button', () => {
  const query =
    '#__next > main > aside > section:nth-child(4) > section > section:nth-child(1)'
  return client
    .click(
      `${query} > section > section > section.jsx-2972492538.extra-button > button`
    )
    .pause(3 * TIME.SECOND)
})

Given('the sign-in button is visible', () => {
  return client.assert.visible(
    `header > div > div > section.jsx-3112733317.right > button.jsx-1553655394`
  )
})

Then('the require sign-in notification should be visible', () => {
  return client.assert.visible(`section > div > div > section`)
})
