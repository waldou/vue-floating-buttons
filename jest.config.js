module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  testMatch: [
    '<rootDir>/src/**/*.test.js',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
  ],
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'babel-jest'
  },
  coverageDirectory: '<rootDir>/.coverage/',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
}
