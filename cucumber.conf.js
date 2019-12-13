const { setDefaultTimeout, AfterAll, BeforeAll } = require('cucumber')
const {
  createSession,
  closeSession,
  startWebDriver,
  stopWebDriver
} = require('nightwatch-api')

const env = process.env.BDD_ENV

setDefaultTimeout(50000)

BeforeAll(async () => {
  await startWebDriver({ env })
  await createSession({ env })
})

AfterAll(async () => {
  await closeSession()
  await stopWebDriver()
})
