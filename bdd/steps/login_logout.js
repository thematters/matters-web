const { client } = require('nightwatch-api')
const { Given, Then, When } = require('cucumber')

const PATH = require('../common/enums/path')
const TIME = require('../common/enums/time')

/*----- Common -----*/

Then('the header should be logged status', () => {
  return client.assert.visible('header section.me div.avatar')
})

Then('the header should be unlogged status', () => {
  return client.expect
    .elements('header > div > div > section.right > button')
    .count.to.equal(2)
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
  return client.moveToElement('header section.me div.avatar', 10, 10)
})

Then('the user drop down should be visible', () => {
  return client
    .moveToElement('header section.me div.avatar', 10, 10)
    .waitForElementVisible('div.tippy-popper')
    .expect.elements('div.tippy-popper div.tippy-content ul.menu li')
    .count.not.equal(0)
})

When('I click the logout button in drop down menu', () => {
  return client
    .click('div.tippy-popper div.tippy-content ul.menu li:last-child')
    .pause(2 * TIME.SECOND)
})
