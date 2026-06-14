module.exports = {

  retries: 1, // Flaky test handling

  reporter: [
    ['html'],
    ['list']
  ],

  use: {
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure'
  }
};