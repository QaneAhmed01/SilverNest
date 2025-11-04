import { test, expect } from '@playwright/test';

test.describe('Navigation accessibility', () => {
  test('skip link and keyboard navigation', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-skip-link]')).toBeVisible();

    await page.keyboard.press('Enter');
    await expect(page.locator('#skip')).toBeFocused();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.waitForURL('**/analyze');

    await expect(page.locator('text=Step 1 · Add your profile')).toBeVisible();
  });
});
