
import { test, expect } from '@playwright/test';

import path from 'path';

import { readExcel } from '../../src/utils/excelReader';

import { ContactsPage } from '../../src/pages/ContactsPage';

const excelPath = path.join(
    __dirname,
    '../../src/data/ContactTestDetails.xlsx'
);

const contactData: any[] = readExcel(excelPath);

test(
    'Create Multiple Contacts from Excel with Auto Healing',
    async ({ page }) => {

        test.setTimeout(300000);

        const contactPage = new ContactsPage(page);

        // =========================================================
        // Open Salesforce
        // =========================================================

        // Action
        await page.goto('/', {
            waitUntil: 'domcontentloaded'
        });

        // Expected Result
        await expect(page).toHaveURL(/force\.com/);

        // =========================================================
        // Create contacts from Excel
        // =========================================================

        for (const data of contactData) {

            console.log('========================================');

            console.log(
                'Starting Contact:',
                data.FirstName,
                data.LastName
            );

            console.log(
                'Current URL before Contacts:',
                page.url()
            );

            // =====================================================
            // Navigate to Contacts
            // =====================================================

            // Action
            await contactPage.clickContacts();

            // Expected Result
            // Contacts navigation must be completed before
            // attempting to create the next Contact.
            await expect(contactPage.Contacts).toBeVisible({
                timeout: 30000
            });

            // The Contacts list must be ready and the New button
            // must be available before continuing.
            await expect(contactPage.New).toBeVisible({
                timeout: 30000
            });

            await expect(contactPage.New).toBeEnabled({
                timeout: 30000
            });

            console.log(
                'Contacts list ready for:',
                data.FirstName,
                data.LastName
            );

            // =====================================================
            // Click New
            // =====================================================

            // Action
            await contactPage.clickNew();

            // Expected Result
            // Wait for the New Contact form to become ready.
            await contactPage.waitForNewContactForm();

            console.log(
                'New Contact form ready for:',
                data.FirstName,
                data.LastName
            );

            // =====================================================
            // Select Salutation
            // =====================================================

            // Action
            await contactPage.selectSalutation(
                String(data.Salutation)
            );

            // Expected Result
            await expect(contactPage.Salutation).toContainText(
                String(data.Salutation)
            );

            // =====================================================
            // Enter First Name
            // =====================================================

            // Action
            await contactPage.enterFirstName(
                String(data.FirstName)
            );

            // Expected Result
            await expect(contactPage.FirstName).toHaveValue(
                String(data.FirstName)
            );

            // =====================================================
            // Enter Last Name
            // =====================================================

            // Action
            await contactPage.enterLastName(
                String(data.LastName)
            );

            // Expected Result
            await expect(contactPage.LastName).toHaveValue(
                String(data.LastName)
            );

            // =====================================================
            // Select Account
            // =====================================================

            // Action
            await contactPage.selectAccountName(
                String(data.AccountName)
            );

            // Expected Result
            await expect(contactPage.AccountName).toHaveAttribute(
                'data-value',
                String(data.AccountName)
            );

            // =====================================================
            // Enter Phone
            // =====================================================

            // Action
            await contactPage.enterPhone(
                data.Phone
            );

            // Expected Result
            await expect(contactPage.Phone).toHaveValue(
                String(data.Phone)
            );

            // =====================================================
            // Enter Mobile
            // =====================================================

            // Action
            await contactPage.enterMobile(
                data.Mobile
            );

            // Expected Result
            await expect(contactPage.Mobile).toHaveValue(
                String(data.Mobile)
            );

            // =====================================================
            // Enter Email
            // =====================================================

            // Action
            await contactPage.enterEmail(
                String(data.Email)
            );

            // Expected Result
            await expect(contactPage.Email).toHaveValue(
                String(data.Email)
            );

            // =====================================================
            // Enter Department
            // =====================================================

            // Action
            await contactPage.enterDepartment(
                String(data.Department)
            );

            // Expected Result
            await expect(contactPage.Department).toHaveValue(
                String(data.Department)
            );

            // =====================================================
            // Enter Fax
            // =====================================================

            // Action
            await contactPage.enterFax(
                data.Fax
            );

            // Expected Result
            await expect(contactPage.Fax).toHaveValue(
                String(data.Fax)
            );

            // =====================================================
            // Enter Birthdate
            // =====================================================

            // Action
            await contactPage.enterBirthDate(
                data.Birthdate
            );

            // Expected Result
            await expect(contactPage.Birthdate).toHaveValue(
                String(data.Birthdate)
            );

            // =====================================================
            // Select Lead Source
            // =====================================================

            // Action
            await contactPage.selectLeadSource(
                String(data.LeadSource)
            );

            // Expected Result
            await expect(contactPage.LeadSource).toContainText(
                String(data.LeadSource)
            );

            // =====================================================
            // Mailing Country
            // =====================================================

            // Action
            await contactPage.selectMailingCountry(
                String(data.MailingCountry)
            );

            // Expected Result
            // Successful selection is verified by method completion.

            // =====================================================
            // Mailing Street
            // =====================================================

            // Action
            await contactPage.enterMailingStreet(
                String(data.MailingStreet)
            );

            // Expected Result
            await expect(contactPage.MailingStreet).toHaveValue(
                String(data.MailingStreet)
            );

            // =====================================================
            // Mailing City
            // =====================================================

            // Action
            await contactPage.enterMailingCity(
                String(data.MailingCity)
            );

            // Expected Result
            await expect(contactPage.MailingCity).toHaveValue(
                String(data.MailingCity)
            );

            // =====================================================
            // Mailing State
            // =====================================================

            // Action
            await contactPage.selectMailingState(
                String(data.MailingState)
            );

            // Expected Result
            // Successful selection is verified by method completion.

            // =====================================================
            // Mailing Postal Code
            // =====================================================

            // Action
            await contactPage.enterMailingPostalCode(
                data.MailingPostalCode
            );

            // Expected Result
            await expect(contactPage.MailingPostalCode).toHaveValue(
                String(data.MailingPostalCode)
            );

            // =====================================================
            // Other Country
            // =====================================================

            // Action
            await contactPage.selectOtherCountry(
                String(data.OtherCountry)
            );

            // Expected Result
            // Successful selection is verified by method completion.

            // =====================================================
            // Other Street
            // =====================================================

            // Action
            await contactPage.enterOtherStreet(
                String(data.OtherStreet)
            );

            // Expected Result
            await expect(contactPage.OtherStreet).toHaveValue(
                String(data.OtherStreet)
            );

            // =====================================================
            // Other City
            // =====================================================

            // Action
            await contactPage.enterOtherCity(
                String(data.OtherCity)
            );

            // Expected Result
            await expect(contactPage.OtherCity).toHaveValue(
                String(data.OtherCity)
            );

            // =====================================================
            // Other State
            // =====================================================

            // Action
            await contactPage.selectOtherState(
                String(data.OtherState)
            );

            // Expected Result
            // Successful selection is verified by method completion.

            // =====================================================
            // Other Postal Code
            // =====================================================

            // Action
            await contactPage.enterOtherPostalCode(
                data.OtherPostalCode
            );

            // Expected Result
            await expect(contactPage.OtherPostalCode).toHaveValue(
                String(data.OtherPostalCode)
            );

            // =====================================================
            // Save Contact
            // =====================================================

            // Expected Result
            await expect(contactPage.Save).toBeVisible({
                timeout: 30000
            });

            await expect(contactPage.Save).toBeEnabled({
                timeout: 30000
            });

            // Action
            await contactPage.clickSave();

            // =====================================================
            // Contact Creation Verification
            // =====================================================

            // Expected Result
            // Salesforce should display the My Contacts heading
            // after the Contact is successfully created.
            await expect(contactPage.MyContacts).toBeVisible({
                timeout: 30000
            });

            // Give Salesforce Lightning a short amount of time
            // to finish settling before starting the next Contact.
            await page.waitForTimeout(5000);

            console.log(
                'Contact saved successfully:',
                data.FirstName,
                data.LastName
            );

            console.log(
                'Verified My Contacts heading for:',
                data.FirstName,
                data.LastName
            );

            
            console.log('========================================');
        }
    }
);
