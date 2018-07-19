/**

Eslint quickstart config
------------------------

yarn add --dev jest

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
  //   '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/src/__mocks__/fileMock.js'
  // }

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
