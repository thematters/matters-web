const { DELAY_DEFAULT } = require('../common/enums/delay')

module.exports = {
  'step 1: navigate to home': function (browser) {
    browser
      .url('http://0.0.0.0:3000')
      .waitForElementVisible('body', DELAY_DEFAULT)
      .waitForElementVisible('article', DELAY_DEFAULT)
      .waitForElementVisible('aside', DELAY_DEFAULT)
  }
}
