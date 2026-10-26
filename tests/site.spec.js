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

test('кнопка «Фото» открывает окно предпросмотра и закрывает его', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Фото: Капучино' }).click();
  const dialog = page.locator('#photo-dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.locator('img')).toHaveAttribute('alt', 'Капучино');
  await expect(dialog.locator('.photo-title')).toContainText('230 ₽');
  await dialog.getByRole('button', { name: 'Закрыть' }).click();
  await expect(dialog).toBeHidden();
});
