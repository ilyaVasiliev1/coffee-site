import { defineConfig } from '@playwright/test';

// Тесты идут на локальной сборке, а не на живом сайте: так их не ломают блокировки по IP и они одинаковы в любом облаке.
export default defineConfig({
  testDir: 'tests',
  retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: { baseURL: 'http://localhost:4173', screenshot: 'on' },
  webServer: {
    command: 'npm run build && npm run preview',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
  },
});
