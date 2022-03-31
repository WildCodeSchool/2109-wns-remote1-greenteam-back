module.exports = {
  env: {
    browser: false,
    node: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'airbnb-typescript/base', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: './',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'no-unused-vars': ['error', { varsIgnorePattern: 'returns' }],
    'import/no-cycle': 'off',
    'class-methods-use-this': 'off'
  },
  ignorePatterns: ['.eslintrc.js'],
};
