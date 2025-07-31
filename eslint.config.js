import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: { ...globals.browser, ...globals.es2020 },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: importPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'object-curly-spacing': 'off',
      'import/object-curly-spacing': 'off',
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // Встроенные модули (node:fs, node:path и т.д.)
            'external', // Внешние зависимости (из node_modules)
            'internal', // Внутренние пути (алиасы, относительные пути)
            ['parent', 'sibling', 'index'], // Родительские, соседние и index-файлы
            'object', // Импорты типов (для TypeScript)
            'type', // Типы (если используется TypeScript)
          ],
          pathGroups: [
            {
              pattern: '@/**', // Пример для алиасов (настройте под ваш проект)
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@components/**',
              group: 'internal',
            },
          ],
          'newlines-between': 'always', // Пустые строки между группами
          alphabetize: {
            order: 'asc', // Сортировка по алфавиту
            caseInsensitive: true, // Без учета регистра
          },
        },
      ],
    },
  },
  prettierConfig,
];
