module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', 'react-hooks', 'import', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'react/function-component-definition': ['warn', { namedComponents: 'arrow-function' }],
    'react/self-closing-comp': ['error', { component: true, html: true }],
    'prefer-const': 'error',
    'max-lines': ['warn', { max: 124 }],
    'max-params': ['error', 3],
    'import/no-unresolved': 'error',
    'import/no-absolute-path': 'error',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
          ['@assets', './src/assets'],
          ['@components', './src/components'],
          ['@utils', './src/utils'],
          ['@pages', './src/pages'],
          ['@styles', './src/styles'],
          ['@data', './src/data'],
        ],
        extensions: ['.js', '.jsx'],
      },
    },
  },
};
