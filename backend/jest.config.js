// Jest configuration tailored for the backend API tests
module.exports = {
  testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/**/*.test.js'],
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['text', 'lcov'],
  collectCoverageFrom: [
    '<rootDir>/**/*.js',
    '!<rootDir>/node_modules/**',
    '!<rootDir>/coverage/**',
    '!<rootDir>/jest.config.js',
    '!<rootDir>/server/**', // legacy scaffolding not part of this backend
  ],
  testTimeout: 10000,
};
