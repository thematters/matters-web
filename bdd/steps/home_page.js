const { client } = require('nightwatch-api')
const { Given, Then, When } = require('cucumber')

const PATH = require('../common/enums/path')
const SCRIPT = require('../common/enums/script')
const TIME = require('../common/enums/time')

/*----- Matters Today -----*/

Then('the Matters Today title should be visible', () => {
  return client.assert.visible('h2.feature')
})

Then('the Matters Today description should visible', () => {
  return client.assert.visible('div.description')
})

When("I click the Matters Today's cover", () => {
  return client.click('div.cover-container').pause(2 * TIME.SECOND)
})

/*----- Hottest Feed -----*/

Then('the hottest list should be visible', () => {
  const query = 'main > article > div > ul'
  return client
    .waitForElementVisible(`${query}`)
    .expect.elements(`${query} > li`)
    .count.to.equal(10)
})

Then(
  'the article title and description in hottest list should be visible',
  () => {
    const query = 'main > article > div > ul > li:first-child > section > div'
    return client.assert
      .visible(`${query} > div.title > a > h2.feed`)
      .assert.visible(`${query} > div.description`)
  }
)

When('I scroll down to the end of the hottest list', () => {
  const query = 'main > article > div:last-child > button'
  return client.execute(
    `document.querySelector('${query}').scrollIntoView({ block: 'center' })`
  )
})

Then('the load more button should be visible', () => {
  return client.assert.visible('main > article > div:last-child > button')
})

When('I click the load more button', () => {
  return client
    .click('main > article > div:last-child > button')
    .pause(2 * TIME.SECOND)
})

Then('more hottest articles are loaded', () => {
  return client.expect
    .elements('main > article > div > ul > li')
    .count.to.equal(20)
})

/*----- ICYMI Feed -----*/

Then('the ICYMI list should be visible', () => {
  const query = 'main > aside > section:first-child > ul'
  return client.assert
    .visible(`${query}`)
    .expect.elements(`${query} > li`)
    .count.not.to.equal(0)
})

Then('the article title in ICYMI list should be visible', () => {
  return client.assert.visible(
    'main > aside > section:first-child > ul > li:first-child > section h2.sidebar'
  )
})

When('I click the ICYMI article title', () => {
  return client
    .execute(SCRIPT.SCROLL_TOP)
    .click(
      'main > aside > section:first-child > ul > li:first-child > section > div > div > a'
    )
    .pause(2 * TIME.SECOND)
})

/*----- Topics Feed -----*/

Then('the topics list should be visible', () => {
  const query = 'main > aside > section:nth-child(2) > ol'
  return client.assert
    .visible(`${query}`)
    .expect.elements(`${query} > li`)
    .count.not.to.equal(0)
})

Then('the article title in topics list should be visible', () => {
  return client.assert.visible(
    'main > aside > section:nth-child(2) > ol > li > section h2.sidebar'
  )
})

When('I click the topics article title', () => {
  return client
    .execute(SCRIPT.SCROLL_TOP)
    .click(
      'main > aside > section:nth-child(2) > ol > li > section > div > div > a'
    )
    .pause(2 * TIME.SECOND)
})

/*----- Authors Feed -----*/

Then('the authors list should be visible', () => {
  const query = 'main > aside > section:nth-child(3) > ul'
  return client.assert
    .visible(`${query}`)
    .expect.elements(`${query} > li`)
    .count.not.to.equal(0)
})

Then('the author name in auhtors list should be visible', () => {
  return client.assert.visible(
    'main > aside > section:nth-child(3) > ul > li:first-child > section > section > a'
  )
})

When('I click the authors name', () => {
  return client
    .click(
      'main > aside > section:nth-child(3) > ul > li:first-child > section > section > a'
    )
    .pause(2 * TIME.SECOND)
})

/*----- Tags Feed -----*/

Then('the tags list should be visible', () => {
  const query = 'main > aside > section:nth-child(4) > ul'
  return client.assert
    .visible(`${query}`)
    .expect.elements(`${query} > li`)
    .count.not.to.equal(0)
})

Then('the tag name in tags list should be visible', () => {
  return client.assert.visible(
    'main > aside > section:nth-child(4) > ul > li:first-child > a'
  )
})

When('I click the tags name', () => {
  return client
    .click('main > aside > section:nth-child(4) > ul > li:first-child > a')
    .pause(2 * TIME.SECOND)
})
