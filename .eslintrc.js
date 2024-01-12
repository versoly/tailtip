module.exports = {
  env: {
    commonjs: true,
    node: true,
    browser: true,
    es6: true,
    jest: true,
  },
  extends: ['prettier'],
  globals: {},
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['prettier', 'import'],
  ignorePatterns: ['node_modules/', 'build/', 'dist/'],
  rules: {
    'import/no-anonymous-default-export': 'off',
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        'prettier/prettier': [
          'error',
          {
            semi: true,
            singleQuote: true,
            tabWidth: 2,
            useTabs: false,
            trailingComma: 'es5',
          },
        ],
        'import/no-anonymous-default-export': 'off',
      },
    },
  ],
};
