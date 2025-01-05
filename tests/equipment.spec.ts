import { test, expect } from '@playwright/test';

test.describe('Equipment Management', () => {
  test('Should create new equipment with valid data', async ({ page }) => {
    await page.goto('http://localhost:3000/equipment', { waitUntil: 'networkidle' });

    await page.waitForSelector('input[name="name"]', { state: 'visible' });
    await page.fill('input[name="name"]', 'Excavator');
    await page.fill('input[name="type"]', 'Heavy Machinery');
    await page.fill('input[name="status"]', 'Operational');
    await page.click('button[type="submit"]');

    // Wait for the table to update and check for new equipment
    await page.waitForTimeout(2000); // Temporary if there's a delay in UI updates
    await expect(page.locator('table')).toContainText('Excavator');
  });

  test('Should show validation errors for invalid equipment data', async ({ page }) => {
    await page.goto('http://localhost:3000/equipment', { waitUntil: 'networkidle' });
    await page.click('button[type="submit"]'); // Submit without filling fields

    // Wait for validation messages
    await page.waitForTimeout(1000); // Temporary if messages take time to appear
    await expect(page.locator('text=Name is required')).toBeVisible();
    await expect(page.locator('text=Type is required')).toBeVisible();
    await expect(page.locator('text=Status is required')).toBeVisible();
  });

  test('Should edit existing equipment', async ({ page }) => {
    await page.goto('http://localhost:3000/equipment', { waitUntil: 'networkidle' });

    await page.waitForSelector('button[aria-label="Edit Excavator"]', { state: 'visible' });
    await page.click('button[aria-label="Edit Excavator"]');
    await page.fill('input[name="name"]', 'Updated Excavator');
    await page.click('button[type="submit"]');

    // Wait for the table to update and check for updated equipment
    await page.waitForTimeout(2000); // Temporary if there's a delay in UI updates
    await expect(page.locator('table')).toContainText('Updated Excavator');
  });

  test('Should filter equipment table', async ({ page }) => {
    await page.goto('http://localhost:3000/equipment', { waitUntil: 'networkidle' });

    await page.waitForSelector('input[name="filter"]', { state: 'visible' });
    await page.fill('input[name="filter"]', 'Excavator');

    // Wait for the filter to apply and check results
    await page.waitForTimeout(2000); // Temporary if there's a delay in UI updates
    await expect(page.locator('table')).toContainText('Excavator');
    await expect(page.locator('table')).not.toContainText('Bulldozer');
  });
});
