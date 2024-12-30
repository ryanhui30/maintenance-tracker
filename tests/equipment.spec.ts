import { test, expect } from '@playwright/test';

test.describe('Equipment Management', () => {
  test('Should create new equipment with valid data', async ({ page }) => {
    await page.goto('http://localhost:3000/equipment');
    await page.fill('input[name="name"]', 'Excavator');
    await page.fill('input[name="type"]', 'Heavy Machinery');
    await page.fill('input[name="status"]', 'Operational');
    await page.click('button[type="submit"]');

    // Assert that the new equipment appears in the table
    await expect(page.locator('table')).toContainText('Excavator');
  });

  test('Should show validation errors for invalid equipment data', async ({ page }) => {
    await page.goto('http://localhost:3000/equipment');
    await page.click('button[type="submit"]'); // Submit without filling fields

    // Assert validation messages
    await expect(page.locator('text=Name is required')).toBeVisible();
    await expect(page.locator('text=Type is required')).toBeVisible();
    await expect(page.locator('text=Status is required')).toBeVisible();
  });

  test('Should edit existing equipment', async ({ page }) => {
    await page.goto('http://localhost:3000/equipment');
    await page.click('button[aria-label="Edit Excavator"]');
    await page.fill('input[name="name"]', 'Updated Excavator');
    await page.click('button[type="submit"]');

    // Assert updated equipment appears in the table
    await expect(page.locator('table')).toContainText('Updated Excavator');
  });

  test('Should filter equipment table', async ({ page }) => {
    await page.goto('http://localhost:3000/equipment');
    await page.fill('input[name="filter"]', 'Excavator');

    // Assert only filtered results are visible
    await expect(page.locator('table')).toContainText('Excavator');
    await expect(page.locator('table')).not.toContainText('Bulldozer');
  });
});
