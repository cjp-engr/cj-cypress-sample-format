import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      //---start mochawesome reporter
      require('cypress-mochawesome-reporter/plugin')(on);
      //---end mochawesome reporter
    },
    env: {
      sauceLabs: 'https://www.saucedemo.com/',
    },
    chromeWebSecurity: false
  },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Swag Labs Report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  "retries": {
    "runMode": 3,
    "openMode": 3
  },
  projectId: "asmfy8"
});
