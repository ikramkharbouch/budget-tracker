const { jest } = require('@jest/globals');

// Global test setup
global.console = {
  ...console,
  error: jest.fn(),
  warn: jest.fn(),
  log: jest.fn()
};
