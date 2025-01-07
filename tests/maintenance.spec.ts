import { test, expect } from '@playwright/test';

test.describe('Maintenance Record Management', () => {
  test('Should create new maintenance record', async ({ page }) => {
    await page.goto('http://localhost:3000/maintenance');

    await page.fill('input[name="equipmentId"]', 'Excavator');
    await page.fill('input[name="date"]', '2025-01-04');
    await page.selectOption('select[name="type"]', 'Repair');
    await page.fill('input[name="technician"]', 'John Doe');
    await page.fill('input[name="hoursSpent"]', '5');
    await page.fill('textarea[name="description"]', 'Replaced hydraulic hoses');
    await page.selectOption('select[name="priority"]', 'High');
    await page.selectOption('select[name="completionStatus"]', 'Complete');
    await page.click('button[type="submit"]');

    // Verify the new record is added
    await expect(page.locator('table')).toContainText('Excavator');
  });

  test('Should validate maintenance hours (reject negative/over 24)', async ({ page }) => {
    await page.goto('http://localhost:3000/maintenance');

    await page.fill('input[name="hoursSpent"]', '-5');
    await page.click('button[type="submit"]');
    await expect(page.locator('text=Hours spent must be a positive number')).toBeVisible();

    await page.fill('input[name="hoursSpent"]', '25');
    await page.click('button[type="submit"]');
    await expect(page.locator('text=Hours spent cannot exceed 24 hours')).toBeVisible();
  });

  test('Should show equipment name in maintenance table', async ({ page }) => {
    await page.goto('http://localhost:3000/maintenance');

    // Verify equipment name exists in the table
    await expect(page.locator('table')).toContainText('Excavator');
  });

  test('Should filter maintenance records by date range', async ({ page }) => {
    await page.goto('http://localhost:3000/maintenance');

    await page.fill('input[name="startDate"]', '2025-01-01');
    await page.fill('input[name="endDate"]', '2025-01-04');
    await page.click('button[type="filter"]');

    // Verify that only records within the date range are shown
    await expect(page.locator('table')).toContainText('2025-01-04');
    await expect(page.locator('table')).not.toContainText('2024-12-31');
  });
});
