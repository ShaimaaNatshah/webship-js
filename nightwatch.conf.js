const Services = {}; loadServices();

//  _   _  _         _      _                     _          _
// | \ | |(_)       | |    | |                   | |        | |
// |  \| | _   __ _ | |__  | |_ __      __  __ _ | |_   ___ | |__
// | . ` || | / _` || '_ \ | __|\ \ /\ / / / _` || __| / __|| '_ \
// | |\  || || (_| || | | || |_  \ V  V / | (_| || |_ | (__ | | | |
// \_| \_/|_| \__, ||_| |_| \__|  \_/\_/   \__,_| \__| \___||_| |_|
//             __/ |
//            |___/

module.exports = {
  // An array of folders (excluding subfolders) where your tests are located;
  // if this is not specified, the test source must be passed as the second argument to the test runner.
  src_folders: ['tests/step-definitions'],

  // See https://nightwatchjs.org/guide/working-with-page-objects/
  page_objects_path: '',

  // See https://nightwatchjs.org/guide/extending-nightwatch/#writing-custom-commands
  custom_commands_path: '',

  // See https://nightwatchjs.org/guide/extending-nightwatch/#writing-custom-assertions
  custom_assertions_path: '',

  // See https://nightwatchjs.org/guide/#external-globals
  globals_path: '',

  webdriver: {},

  test_runner: {
    type: 'cucumber',
    options: {
      feature_path: 'tests/features/*.feature',
      additional_config: '',
      parallel: 2,
    },

  },

  test_settings: {
    default: {
      launch_url: 'http://localhost:8080/',
      selenium_port: 4444,
      selenium_host: '127.0.0.1',
      silent: true,
      screenshots: {
        enabled: true,
        path: './reports/screenshots',
      },

      desiredCapabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
          // More info on Chromedriver: https://sites.google.com/a/chromium.org/chromedriver/
          //
          // w3c:false tells Chromedriver to run using the legacy JSONWire protocol (not required in Chrome 78)
          w3c: false,
          args: [
            '--headless',
            '--start-maximized',
            '--disable-gpu',
            '--window-size=1600,1200',
            '--no-sandbox',
            '--disable-dev-shm-usage',
            '--disable-setuid-sandbox',
            '--disable-web-security',
            '--DNS-prefetch-disable',
            '--disable-translate',
            '--ignore-certificate-errors',
            '--test-type',
            '--disable-extensions',
            '--incognito',
            '--disable-infobars',
            '--remote-debugging-port=9222',
            '--allowed-ips=*',
            '--whitelisted-ips=*',
            '--allow-insecure-localhost',
          ],
        },
      },
    },

    safari: {
      desiredCapabilities: {
        browserName: 'safari',
        alwaysMatch: {
          acceptInsecureCerts: false,
        },
      },
      webdriver: {
        server_path: '',
      },
    },

    firefox: {
      desiredCapabilities: {
        browserName: 'firefox',
        alwaysMatch: {
          acceptInsecureCerts: true,
          'moz:firefoxOptions': {
            args: [
              // '-headless',
              // '-verbose'
            ],
          },
        },
      },
      webdriver: {
        server_path: '',
        cli_args: [
          // very verbose geckodriver logs
          // '-vv'
        ],
      },
    },

    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
          // More info on Chromedriver: https://sites.google.com/a/chromium.org/chromedriver/
          //
          // w3c:false tells Chromedriver to run using the legacy JSONWire protocol (not required in Chrome 78)
          w3c: true,
          args: [
            // '--no-sandbox',
            // '--ignore-certificate-errors',
            // '--allow-insecure-localhost',
            // '--headless'
          ],
        },
      },

      webdriver: {
        start_process: true,
        server_path: '',
        cli_args: [
          // --verbose
        ],
      },
    },

    edge: {
      desiredCapabilities: {
        browserName: 'MicrosoftEdge',
        'ms:edgeOptions': {
          w3c: true,
          // More info on EdgeDriver: https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options
          args: [
            // '--headless'
          ],
        },
      },

      webdriver: {
        // Download msedgedriver from https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/
        //  and set the location below:
        server_path: '',
        cli_args: [
          // --verbose
        ],
      },
    },

    /// ///////////////////////////////////////////////////////////////////////////////
    // Configuration for when using cucumber-js (https://cucumber.io)                |
    //                                                                               |
    // It uses the bundled examples inside the nightwatch examples folder; feel free |
    // to adapt this to your own project needs                                       |
    /// ///////////////////////////////////////////////////////////////////////////////
    'cucumber-js': {
      src_folders: ['examples/cucumber-js/features/step_definitions'],

      test_runner: {
        // set cucumber as the runner
        type: 'cucumber',

        // define cucumber specific options
        options: {
          // set the feature path
          feature_path: 'node_modules/nightwatch/examples/cucumber-js/*/*.feature',

          // start the webdriver session automatically (enabled by default)
          // auto_start_session: true

          // use parallel execution in Cucumber
          // parallel: 2 // set number of workers to use (can also be defined in the cli as --parallel 2
        },
      },
    },

    /// ///////////////////////////////////////////////////////////////////////////////
    // Configuration for when using the browserstack.com cloud service               |
    //                                                                               |
    // Please set the username and access key by setting the environment variables:  |
    // - BROWSERSTACK_USER                                                           |
    // - BROWSERSTACK_KEY                                                            |
    // .env files are supported                                                      |
    /// ///////////////////////////////////////////////////////////////////////////////
    browserstack: {
      selenium: {
        host: 'hub-cloud.browserstack.com',
        port: 443,
      },
      // More info on configuring capabilities can be found on:
      // https://www.browserstack.com/automate/capabilities?tag=selenium-4
      desiredCapabilities: {
        'bstack:options': {
          userName: '${BROWSERSTACK_USER}',
          accessKey: '${BROWSERSTACK_KEY}',
        },
      },

      disable_error_log: true,
      webdriver: {
        timeout_options: {
          timeout: 15000,
          retry_attempts: 3,
        },
        keep_alive: true,
        start_process: false,
      },
    },

    'browserstack.local': {
      extends: 'browserstack',
      desiredCapabilities: {
        'browserstack.local': true,
      },
    },

    'browserstack.chrome': {
      extends: 'browserstack',
      desiredCapabilities: {
        browserName: 'chrome',
        chromeOptions: {
          w3c: true,
        },
      },
    },

    'browserstack.firefox': {
      extends: 'browserstack',
      desiredCapabilities: {
        browserName: 'firefox',
      },
    },

    'browserstack.ie': {
      extends: 'browserstack',
      desiredCapabilities: {
        browserName: 'internet explorer',
        browserVersion: '11.0',
      },
    },

    'browserstack.safari': {
      extends: 'browserstack',
      desiredCapabilities: {
        browserName: 'safari',
      },
    },

    'browserstack.local_chrome': {
      extends: 'browserstack.local',
      desiredCapabilities: {
        browserName: 'chrome',
      },
    },

    'browserstack.local_firefox': {
      extends: 'browserstack.local',
      desiredCapabilities: {
        browserName: 'firefox',
      },
    },
    /// ///////////////////////////////////////////////////////////////////////////////
    // Configuration for when using the Selenium service, either locally or remote,  |
    //  like Selenium Grid                                                           |
    /// ///////////////////////////////////////////////////////////////////////////////
    selenium_server: {
      // Selenium Server is running locally and is managed by Nightwatch
      selenium: {
        start_process: true,
        port: 4444,
        server_path: (Services.seleniumServer ? Services.seleniumServer.path : ''),
        cli_args: {
          'webdriver.gecko.driver': (Services.geckodriver ? Services.geckodriver.path : ''),
          'webdriver.chrome.driver': (Services.chromedriver ? Services.chromedriver.path : ''),
        },
      },
    },

    'selenium.chrome': {
      extends: 'selenium_server',
      desiredCapabilities: {
        browserName: 'chrome',
        chromeOptions: {
          w3c: true,
        },
      },
    },

    'selenium.firefox': {
      extends: 'selenium_server',
      desiredCapabilities: {
        browserName: 'firefox',
        'moz:firefoxOptions': {
          args: [
            // '-headless',
            // '-verbose'
          ],
        },
      },
    },
  },
};

function loadServices() {
  try {
    Services.seleniumServer = require('selenium-server');
  } catch (err) {}

  try {
    Services.chromedriver = require('chromedriver');
  } catch (err) {}

  try {
    Services.geckodriver = require('geckodriver');
  } catch (err) {}
}
