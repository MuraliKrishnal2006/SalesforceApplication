import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';

test.describe('Salesforce Login Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('Invalid username', { tag: '@regression' }, async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.loginWithInvalidUsername(
            process.env.SALESFORCE_INVALID_USERNAME!
        );

        const errorMessage =
            await loginPage.getPasswordRequiredError();

        expect(errorMessage).toBe(
            'Error: Please enter your password.'
        );

        await page.waitForTimeout(5000);
    });

    test(
        'Valid username and invalid password',
        { tag: '@regression' },
        async ({ page }) => {
            const loginPage = new LoginPage(page);

            await loginPage.loginWithValidUsernameAndInvalidPassword(
                process.env.SALESFORCE_USERNAME!,
                process.env.SALESFORCE_INVALID_PASSWORD!
            );

            const errorMessage =
                await loginPage.getInvalidPasswordError();

            expect(errorMessage).toContain(
                'Error: Please check your username and password'
            );

            await page.waitForTimeout(5000);
        }
    );

    test(
        'Valid username and valid password',
        { tag: '@smoke' },
        async ({ page }) => {
            const loginPage = new LoginPage(page);

            await loginPage.loginWithValidUsernameAndValidPassword(
                process.env.SALESFORCE_USERNAME!,
                process.env.SALESFORCE_PASSWORD!
            );

            // Allow time for manual Salesforce verification code entry
            await page.waitForTimeout(30000);

            const developerEdition =
                await loginPage.getDeveloperEdition();

            expect(developerEdition).toBe('Developer Edition');
        }
    );

});