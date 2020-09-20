module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
    jest: true
  },
  extends: [
    'plugin:vue/strongly-recommended',
    'eslint:recommended',
    'plugin:vue-scoped-css/recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'indent': [ 'error', 2, { 'SwitchCase': 1 } ],
    'quotes': [ 'error', 'single' ],
    'object-curly-spacing': [ 'error', 'always', { 'objectsInObjects': false, 'arraysInObjects': false } ],
    'array-bracket-spacing': [ 'error', 'always' ],
    'space-in-parens': [ 'error', 'never' ],
    'space-before-blocks': [ 'error' ],
    'brace-style': [ 'error' ],
    'arrow-spacing': [ 'warn' ],
    'comma-spacing': [ 'warn' ],
    'no-multi-spaces': [ 'error' ],
    'no-trailing-spaces': [ 'error' ],
    'no-inline-comments': [ 'error' ],
    'no-duplicate-imports': [ 'error' ],
    'vue/html-closing-bracket-newline': [ 'error', { 'singleline': 'never', 'multiline': 'never' } ],
    'vue-scoped-css/no-unused-selector': 'error',
    'vue-scoped-css/require-scoped': 'off',
    'eol-last': [ 'error', 'always' ],
    'semi': [ 'error', 'never' ],
  },
  overrides: [
    {
      files: [ '*.test.js' ],
      env: { jest: true },
    },
    {
      files: [ '*.vue' ],
      rules: {
        'vue/max-attributes-per-line': [ 'error', {
          'singleline': 5,
          'multiline': {
            'max': 5,
            'allowFirstLine': true
          }
        } ]
      }
    },
  ],
}
