const { client } = require('nightwatch-api')
const { Given, Then, When } = require('cucumber')

const PATH = require('../common/enums/path')
const TIME = require('../common/enums/time')

/*----- Common -----*/

Then('the header should be logged status', () => {
  return client.assert.visible('header section.me div.avatar')
})

/*----- Login -----*/

When('I click the login button in the header', () => {
  return client.click(
    'header > div > div > section:nth-child(2) > button:first-child'
  )
})

Then('the login modal should be visible', () => {
  return client.assert.visible('#modal-anchor form')
})

When('I fill up the login form', () => {
  const query = '#modal-anchor form'
  return client
    .setValue(`${query} input[name='email']`, process.env.BDD_TEST_USER_EMAIL)
    .setValue(
      `${query} input[name='password']`,
      process.env.BDD_TEST_USER_PASSWD
    )
    .click(`${query} button[type='submit']`)
})

When('I click the login button', () => {
  return client
    .click(`#modal-anchor form button[type='submit']`)
    .pause(2 * TIME.SECOND)
})

/*----- Logout -----*/

When('I move mouse to the user avatar in the header', () => {
  return client.moveToElement('header section.me > button:nth-child(3)', 10, 10)
})

Then('the user drop down should be visible', () => {
  return client
    .click('header section.me > button:nth-child(3)')
    .waitForElementVisible('div.tippy-popper')
})

When('I click the logout button in drop down menu', () => {
  return client.click('div.tippy-popper > div > div > div > ul > li:last-child')
})

Then('the header should be unlogged status', () => {
  const query = 'header > div > div > section:nth-child(2) > button'
  return client
    .waitForElementVisible(query)
    .expect.elements(query)
    .count.to.equal(2)
})
