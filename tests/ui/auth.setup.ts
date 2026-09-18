import { test as setup } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { LoginPage } from '../../src/pages/LoginPage';

const authDir = path.join(process.cwd(), 'playwright', '.auth');
const authFile = path.join(authDir, 'salesforce-user.json');

setup('Salesforce authentication', async ({ page }) => {

    // Create .auth folder if it does not exist
    fs.mkdirSync(authDir, { recursive: true });

    const loginPage = new LoginPage(page);

    await page.goto('/');

    const username = process.env.SALESFORCE_USERNAME!;
    const password = process.env.SALESFORCE_PASSWORD!;

    await loginPage.loginWithValidUsernameAndValidPassword(
        username,
        password
    );

    console.log('----------------------------------------');
    console.log('Salesforce login completed.');
    console.log('If verification code appears, enter it manually.');
    console.log('Waiting for authentication to complete...');
    console.log('----------------------------------------');

    // Give yourself time to enter verification code
    await page.waitForTimeout(30000);

    // Save authenticated browser state
    await page.context().storageState({
        path: authFile,
    });

    console.log('----------------------------------------');
    console.log(`Authentication state saved to: ${authFile}`);
    console.log('----------------------------------------');
});