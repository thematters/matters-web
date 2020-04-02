const base = {
  launch: 'http://localhost:3000',
}

const baseDriver = {
  start_process: true,
}

module.exports = {
  src_folders: ['bdd/steps'],

  test_settings: {
    // chrome
    default: {
      ...base,
      webdriver: {
        ...baseDriver,
        server_path: 'node_modules/.bin/chromedriver',
        port: 9000,
        cli_args: ['--port=9000'],
      },
      desiredCapabilities: {
        browserName: 'chrome',
        chromeOptions: {
          args: ['headless', 'no-sandbox'],
        },
      },
    },

    // firefox
    firefox: {
      ...base,
      webdriver: {
        ...baseDriver,
        server_path: 'node_modules/.bin/geckodriver',
        port: 9001,
        cli_args: ['--port=9001'],
      },
      desiredCapabilities: {
        browserName: 'firefox',
        elementScrollBehavior: 1,
        javascriptEnabled: true,
        acceptSslCerts: true,
        alwaysMatch: {
          'moz:firefoxOptions': {
            args: ['--headless'],
          },
        },
      },
    },
  },
}
