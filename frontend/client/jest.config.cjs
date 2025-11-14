module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.js'],
  moduleFileExtensions: ['js', 'jsx'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/src/tests/__mocks__/fileMock.js',
  },
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  testMatch: ['<rootDir>/src/**/*.test.{js,jsx}'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{js,jsx}',
    '!<rootDir>/src/tests/**',
    '!<rootDir>/src/main.jsx',
  ],
};
