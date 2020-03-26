const { setDefaultTimeout, AfterAll, BeforeAll } = require('cucumber')
const {
  createSession,
  closeSession,
  startWebDriver,
  stopWebDriver,
} = require('nightwatch-api')

const driver = process.env.BDD_DRIVER

setDefaultTimeout(10000)

BeforeAll(async () => {
  await startWebDriver({ env: driver })
  await createSession({ env: driver })
})

AfterAll(async () => {
  await closeSession()
  await stopWebDriver()
})
