import { test, expect } from '@playwright/test';

test('меню показывает все позиции', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#menu .item')).toHaveCount(8);
});

test('фильтр оставляет только выбранную категорию', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Десерты' }).click();
  await expect(page.locator('#menu .item')).toHaveCount(2);
});

test('корзина считает добавленные позиции', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'В корзину' }).first().click();
  await expect(page.locator('#cart-count')).toHaveText('1');
});

test('«Раф» стоит 300 ₽ и лежит в категории «Эспрессо»', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Эспрессо', exact: true }).click();
  const raf = page.locator('#menu .item', { hasText: 'Раф' });
  await expect(raf).toHaveCount(1);
  await expect(raf).toContainText('300');
});
