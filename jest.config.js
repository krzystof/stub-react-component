/**

Eslint quickstart config
------------------------

yarn add --dev jest jest-dom

Documentation:
https://facebook.github.io/jest/docs/en/configuration.html

**/

module.exports = {
  clearMocks: true,
  // notify: false,
  // errorOnDeprecated: false,

  // setupFiles: [],
  // setupTestFrameworkScriptFile: null,

  moduleFileExtensions: [
    'js',
    'json',
    'jsx',
    'node',
    'vue',
  ],

  // 'moduleNameMapper': {
  //   '@/(.*)': '<rootDir>/src/$1',
  //   '\\.(jpg|jpeg|png|gif|...add extension here)$': '<rootDir>/src/__mocks__/fileMock.js'
  // }

  transform: {
    '^.+\\.(js|jsx|mjs)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.css$': '<rootDir>/src/jestCssTransform.js',
  },

  testMatch: [
    '**/__tests__/**/*.js?(x)',
    '**/?(*.)+(spec|test).js?(x)'
  ],

  testPathIgnorePatterns: [
    '/node_modules/'
  ],

  // [coverage]
  // collectCoverage: false,
  // collectCoverageFrom: null,
  // coverageDirectory: null,
  // coveragePathIgnorePatterns: [
  //   '/node_modules/'
  // ],
  // coverageReporters: [
  //   'json',
  //   'text',
  //   'lcov',
  //   'clover'
  // ],
  // coverageThreshold: null,
}
