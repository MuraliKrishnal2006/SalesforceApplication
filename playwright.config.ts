import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
    path: path.resolve(__dirname, '.env'),
});

export default defineConfig({
    testDir: './tests',

    fullyParallel: true,

    forbidOnly: !!process.env.CI,

    reporter: 'html',

    // Maximum time for one complete test
    timeout: 120000,

    // Default timeout for expect() assertions
    expect: {
        timeout: 30000,
    },

    use: {
        // Salesforce URL
        baseURL:
            'https://orgfarm-994f879f0a-dev-ed.develop.my.salesforce.com',

        // Maximum time for page navigation
        navigationTimeout: 120000,

        headless: false,

        trace: 'on-first-retry',

        screenshot: 'only-on-failure',
    },

    projects: [

        // =====================================================
        // Authentication setup
        // =====================================================
        {
            name: 'setup',

            testMatch: /auth\.setup\.ts/,
        },

        // =====================================================
        // Main Salesforce tests
        // =====================================================
        {
            name: 'chromium',

            use: {
                ...devices['Desktop Chrome'],

                storageState: path.join(
                    process.cwd(),
                    'playwright',
                    '.auth',
                    'salesforce-user.json'
                ),
            },

            // No dependency on setup
        },
    ],
});