module.exports = {
  src_folders: ['bdd/tests'],

  webdriver: {
    start_process: true,
    port: 4444,
    server_path: require('geckodriver').path
  },

  test_settings: {
    default: {
      launch_url: 'http://0.0.0.0:3000',
      desiredCapabilities: {
        browserName: 'firefox'
      }
    }
  }
}
