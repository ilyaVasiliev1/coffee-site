import { test, expect } from '@playwright/test';

test('меню показывает все позиции', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#menu .item')).toHaveCount(7);
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
