module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    'plugin:vue/recommended',
    'airbnb-base',
  ],
  settings: {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.demo.base.js'
      }
    }
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'import/extensions': 0,
    'vue/require-default-prop': 0,
    'import/no-unresolved': [
      2, { 'caseSensitive': false }
    ],
    'vue/max-attributes-per-line': [2, {
      'singleline': 10,
      'multiline': {
        'max': 1,
        'allowFirstLine': false
      }
    }],
    'import/no-extraneous-dependencies': ['error', { 'peerDependencies': true }],
    // 允许下划线开头的变量
    "no-underscore-dangle": ["error", { "allowAfterThis": true }],
    // 使用双引号
    "quotes": ["error", "double", {
      "avoidEscape": true,
      "allowTemplateLiterals": true
    }]
  },
};
