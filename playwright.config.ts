import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // Ensure this points to your tests folder
  use: {
    baseURL: 'http://localhost:3000', // Update with your app's base URL
    headless: true, // Run tests in headless mode
  },
});
