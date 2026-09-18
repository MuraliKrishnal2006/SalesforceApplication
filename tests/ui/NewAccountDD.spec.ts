import { test, expect } from '@playwright/test';
import path from 'path';
import { readExcel } from '../../src/utils/excelReader';
//import { AccountsPage } from '../../src/pages/AccountsPage';
//import { AccountsPagehealinglocsecond } from '../../src/pages/AccountsPagehealinglocsecond';
import { AccountsPagehealingloc3 } from '../../src/pages/AccountsPagehealingloc3';

const excelPath = path.join(
    __dirname,
    '../../src/data/AccountTestData.xlsx'
);

const accountData: any[] = readExcel(excelPath);

test(
    'Create Multiple Accounts from Excel with Auto Healing',
    async ({ page }) => {

        const accountsPage = new AccountsPagehealingloc3(page);

        // =========================================================
        // Open Salesforce
        // =========================================================

        await page.goto('/', {
            waitUntil: 'domcontentloaded'
        });

        await expect(page).toHaveURL(/force\.com/);


        // =========================================================
        // Create accounts from Excel
        // =========================================================

        for (const data of accountData) {

            // =====================================================
            // Accounts
            // =====================================================

            await accountsPage.clickAccounts();

            await expect(accountsPage.New)
                .toBeVisible();

            await expect(accountsPage.New)
                .toBeEnabled();


            // =====================================================
            // New Account
            // =====================================================

            await accountsPage.clickNew();

            await expect(accountsPage.AccountInformation)
                .toBeVisible();
            await expect(accountsPage.AccountName).toBeVisible();
            await expect(accountsPage.AccountName).toBeEnabled();


            // =====================================================
            // Account Name
            // =====================================================

            await accountsPage.enterAccountName(
                String(data.AccountName)
            );

            await expect(accountsPage.AccountName)
                .toHaveValue(String(data.AccountName));


            // =====================================================
            // Account Number
            // =====================================================

            await accountsPage.enterAccountNumber(
                String(data.AccountNumber)
            );

            await expect(accountsPage.AccountNumber)
                .toHaveValue(String(data.AccountNumber));


            // =====================================================
            // Rating Dropdown
            // =====================================================

            await accountsPage.selectRating(
                String(data.Rating)
            );

            await expect(accountsPage.Rating)
                .toHaveAttribute(
                    'data-value',
                    String(data.Rating)
                );


            // =====================================================
            // Ownership Dropdown
            // =====================================================

            await accountsPage.selectOwnership(
                String(data.Ownership)
            );

            await expect(accountsPage.Ownership)
                .toHaveAttribute(
                    'data-value',
                    String(data.Ownership)
                );


            // =====================================================
            // Billing Country Dropdown
            // =====================================================

            await accountsPage.selectBillingCountry(
                String(data.BillingCountry)
            );

            await expect(accountsPage.BillingCountry)
                .toHaveValue(
                    String(data.BillingCountry)
                );


            // =====================================================
            // Billing Street
            // =====================================================

            await accountsPage.enterBillingStreet(
                String(data.BillingStreet)
            );

            await expect(accountsPage.BillingStreet)
                .toHaveValue(
                    String(data.BillingStreet)
                );


            // =====================================================
            // Billing City
            // =====================================================

            await accountsPage.enterBillingCity(
                String(data.BillingCity)
            );

            await expect(accountsPage.BillingCity)
                .toHaveValue(
                    String(data.BillingCity)
                );


            // =====================================================
            // Billing State Dropdown
            // =====================================================

            await accountsPage.selectBillingState(
                String(data.BillingState)
            );

            await expect(accountsPage.BillingState)
                .toHaveValue(
                    String(data.BillingState)
                );


            // =====================================================
            // Billing Postal Code
            // =====================================================

            await accountsPage.enterBillingPostalCode(
                String(data.BillingPostalCode)
            );

            await expect(accountsPage.BillingPostalCode)
                .toHaveValue(
                    String(data.BillingPostalCode)
                );


            // =====================================================
            // Shipping Country Dropdown
            // =====================================================

            await accountsPage.selectShippingCountry(
                String(data.ShippingCountry));

            //const shippingCountry = page.getByRole('combobox', {
            // name: 'Shipping Country', exact: true});

            // await expect(shippingCountry).toHaveValue(String(data.ShippingCountry));

            // =====================================================
            // Shipping Street
            // =====================================================

            await accountsPage.enterShippingStreet(
                String(data.ShippingStreet)
            );

            await expect(accountsPage.ShippingStreet)
                .toHaveValue(
                    String(data.ShippingStreet)
                );


            // =====================================================
            // Shipping City
            // =====================================================

            await accountsPage.enterShippingCity(
                String(data.ShippingCity)
            );

            await expect(accountsPage.ShippingCity)
                .toHaveValue(
                    String(data.ShippingCity)
                );


            // =====================================================
            // Shipping State Dropdown
            // =====================================================

            await accountsPage.selectShippingState(
                String(data.ShippingState));
            //const shippingState = page.getByRole('combobox', {name: 'Shipping State/Province',
            ///exact: true});

            //await expect(shippingState).toHaveValue(String(data.ShippingState));

            /*
             * Salesforce Shipping State is a custom dropdown.
             * Do NOT use toHaveValue() here because the
             * getByRole('combobox') locator may not expose the
             * selected value as an input value.
             *
             * The selected value is stored in data-value.
             */
            //await expect(accountsPage.ShippingState).toHaveAttribute('data-value', String(data.ShippingState) );


            // =====================================================
            // Shipping Postal Code
            // =====================================================

            await accountsPage.enterShippingPostalCode(
                String(data.ShippingPostalCode)
            );

            await expect(accountsPage.ShippingPostalCode)
                .toHaveValue(
                    String(data.ShippingPostalCode)
                );


            // =====================================================
            // Phone
            // =====================================================

            await accountsPage.enterPhone(
                String(data.Phone)
            );

            await expect(accountsPage.Phone)
                .toHaveValue(
                    String(data.Phone)
                );


            // =====================================================
            // Website
            // =====================================================

            await accountsPage.enterWebsite(
                String(data.Website)
            );

            await expect(accountsPage.Website)
                .toHaveValue(
                    String(data.Website)
                );


            // =====================================================
            // Description
            // =====================================================

            await accountsPage.enterDescription(
                String(data.Description)
            );

            await expect(accountsPage.Description)
                .toHaveValue(
                    String(data.Description)
                );


            // =====================================================
            // Save Account
            // =====================================================
            console.log(
                'Save button count:',
                await accountsPage.Save.count()
            );

            console.log(
                'Save button visible:',
                await accountsPage.Save.isVisible()
            );

            await accountsPage.clickSave();

            const relatedTab =
                await accountsPage.getHealedLocator(
                    accountsPage.RelatedTabLocators
                );

            await expect(relatedTab)
                .toBeVisible();

            await expect(relatedTab)
                .toBeEnabled();
        }
    }
);