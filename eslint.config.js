import js from '@eslint/js';
import globals from 'globals';
import eslintReact from 'eslint-plugin-react';
import eslintReactHooks from 'eslint-plugin-react-hooks';
import eslintReactRefresh from 'eslint-plugin-react-refresh';
import prettierPlugin from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  {
    ignores: ['dist', 'node_modules', 'coverage', 'eslint.config.js'],
  },

  js.configs.recommended,

  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2020,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        sourceType: 'module',
      },
    },
    plugins: {
      react: eslintReact,
      'react-hooks': eslintReactHooks,
      'react-refresh': eslintReactRefresh,
      prettier: prettierPlugin,
    },
    rules: {
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never' }],
      'react/function-component-definition': ['warn', { namedComponents: 'arrow-function' }],
      'react/self-closing-comp': ['error', { component: true, html: true }],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      'prefer-const': 'error',
      'max-lines': ['warn', { max: 124 }],
      'max-params': ['error', 3],

      'import/no-unresolved': 'error',
      'import/no-absolute-path': 'error',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],

      ...prettierPlugin.configs.recommended.rules,
      ...eslintConfigPrettier.rules,
    },
  },

  eslintConfigPrettier,
];
