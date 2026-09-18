import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { AccountsPage } from '../../src/pages/AccountsPage';

test(
    'Create Account with valid login',
    { tag: '@smoke' },
    async ({ page }) => {

        await page.goto('/');

        const loginPage = new LoginPage(page);
        const accountsPage = new AccountsPage(page);

        // Login with valid credentials
        await loginPage.loginWithValidUsernameAndValidPassword(
            process.env.SALESFORCE_USERNAME!,
            process.env.SALESFORCE_PASSWORD!
        );

        // Allow time for manual Salesforce verification code entry
        await page.waitForTimeout(30000);

        // Verify successful login
        const developerEdition =
            await loginPage.getDeveloperEdition();

        expect(developerEdition).toBe('Developer Edition');

        // Accounts
        await accountsPage.clickAccounts();
        await expect(accountsPage.Accounts).toBeVisible();

        // Click New
        await accountsPage.clickNew();
        await expect(accountsPage.AccountInformation).toBeVisible();
        // Account Name
        await accountsPage.enterAccountName('Test AccountsMK');
        await expect(accountsPage.AccountName).toHaveValue('Test AccountsMK');

        // Account Number
        await accountsPage.enterAccountNumber('ACC1002MK');
        await expect(accountsPage.AccountNumber).toHaveValue('ACC1002MK');

        // Rating
        await accountsPage.selectRating('Hot');
        await expect(accountsPage.Rating).toContainText('Hot');

        // Ownership
        await accountsPage.selectOwnership('Public');

        await expect(accountsPage.Ownership).toHaveAttribute(
            'data-value',
            'Public'
        );

        // Billing Country
        await accountsPage.selectBillingCountry('India');
        await expect(accountsPage.BillingCountry).toHaveAttribute('data-value', 'India');

        // Billing Street
        await accountsPage.enterBillingStreet('123 Main Street');
        await expect(accountsPage.BillingStreet).toHaveValue('123 Main Street');

        // Billing City
        await accountsPage.enterBillingCity('Hyderabad');
        await expect(accountsPage.BillingCity).toHaveValue('Hyderabad');

        // Billing State
        await accountsPage.selectBillingState('Telangana');
        await expect(accountsPage.BillingState).toHaveValue('Telangana');

        // Billing Postal Code
        await accountsPage.enterBillingPostalCode('500001');
        await expect(accountsPage.BillingPostalCode).toHaveValue('500001');


        // Shipping Country
        await accountsPage.selectShippingCountry('India');
        await expect(accountsPage.ShippingCountry).toHaveAttribute('data-value', 'India');
        // Shipping Street
        await accountsPage.enterShippingStreet('456 Test Street');
        await expect(accountsPage.ShippingStreet).toHaveValue('456 Test Street');

        // Shipping City
        await accountsPage.enterShippingCity('Hyderabad');
        await expect(accountsPage.ShippingCity).toHaveValue('Hyderabad');

        // Shipping State
        await accountsPage.selectShippingState('Telangana');
        await expect(accountsPage.ShippingState).toHaveValue('Telangana');

        // Shipping Postal Code
        await accountsPage.enterShippingPostalCode('500002');
        await expect(accountsPage.ShippingPostalCode).toHaveValue('500002');



        // Phone
        await accountsPage.enterPhone('9876543210');
        

        // Website
        await accountsPage.enterWebsite('https://example.com');
        await expect(accountsPage.Website).toHaveValue('https://example.com');

        // Description
        await accountsPage.enterDescription('Test account');
        await expect(accountsPage.Description).toHaveValue('Test account');

        // Save
        await accountsPage.clickSave();

        // Final verification
        // Final verification
        //await accountsPage.clickSave();

        await expect(accountsPage.RelatedTab).toBeVisible({
            timeout: 10000
        });
    });