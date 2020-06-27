module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverage: true,
  coverageDirectory: "coverage/",
  errorOnDeprecated: true,
  transform: {
      '^.+\\.ts$': 'ts-jest',
  },
  testEnvironment: "node",
  testRegex: '.*\\.test.ts?$',
  testPathIgnorePatterns: [
    '<rootDir>/node_modules',
    '<rootDir>/lib',
  ]
}
      