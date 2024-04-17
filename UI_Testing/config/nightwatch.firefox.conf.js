module.exports = {
    src_folders: ['tests'], // Specify the folder where your test files are located
    webdriver: {
      start_process: true,
      server_path: require('geckodriver').path, // Set the path to GeckoDriver
      port: 4444,
    },
    test_settings: {
      default: {
        desiredCapabilities: {
          browserName: 'firefox', // Specify the browser
          acceptInsecureCerts: true, // Enable insecure certificates for testing
        },
      },
    },
  };