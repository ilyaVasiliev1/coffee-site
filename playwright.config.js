import { existsSync } from 'node:fs';
import { defineConfig } from '@playwright/test';

// В облаке Claude Chromium предустановлен в /opt/pw-browsers и не совпадает с версией Playwright из npm ci.
// CHROMIUM_PATH позволяет указать браузер вручную в любом другом окружении.
const cloudChromium = '/opt/pw-browsers/chromium';
const executablePath = process.env.CHROMIUM_PATH ?? (existsSync(cloudChromium) ? cloudChromium : undefined);

// Тесты идут на локальной сборке, а не на живом сайте: так их не ломают блокировки по IP и они одинаковы в любом облаке.
export default defineConfig({
  testDir: 'tests',
  retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: { baseURL: 'http://localhost:4173', screenshot: 'on', launchOptions: { executablePath } },
  webServer: {
    command: 'npm run build && npm run preview',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
  },
});
