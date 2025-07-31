import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vite';

// Получаем __dirname в ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      // Базовый алиас для src
      '@': path.resolve(__dirname, './src'),

      // Примеры других алиасов (настройте под ваш проект)
      '@components': path.resolve(__dirname, './src/components'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },
});
