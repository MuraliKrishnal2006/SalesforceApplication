
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {

    // ============================================================
    // MAIN LOCATORS
    // ============================================================

    readonly username: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;

    readonly passwordRequiredError: Locator;
    readonly invalidPasswordError: Locator;
    readonly developerEdition: Locator;

    // ============================================================
    // HEALING LOCATORS
    //
    // P1 = intentionally wrong locator
    // P2 = existing working locator
    // P3/P4 = fallback locators
    // ============================================================

    readonly UsernameLocators: Locator[];
    readonly PasswordLocators: Locator[];
    readonly LoginButtonLocators: Locator[];

    readonly PasswordRequiredErrorLocators: Locator[];
    readonly InvalidPasswordErrorLocators: Locator[];
    readonly DeveloperEditionLocators: Locator[];

    // ============================================================
    // CONSTRUCTOR
    // ============================================================

    constructor(page: Page) {

        super(page);

        // ========================================================
        // MAIN LOCATORS
        // ========================================================

        this.username = page.getByRole('textbox', {
            name: 'Username',
            exact: true
        });

        this.password = page.getByRole('textbox', {
            name: 'Password',
            exact: true
        });

        this.loginButton = page.getByRole('button', {
            name: 'Log In',
            exact: true
        });

        this.passwordRequiredError = page.locator(
            '//div[text()="Error: Please enter your password."]'
        );

        this.invalidPasswordError = page.locator(
            "//div[contains(text(),'Error: Please check your username and password')]"
        );

        this.developerEdition = page.locator(
            "//span[text()='Developer Edition']"
        );

        // ========================================================
        // USERNAME HEALING LOCATORS
        // ========================================================

        this.UsernameLocators = [

            // P1 - intentionally wrong
            page.locator(
                'input[data-healing-test="wrong-username"]'
            ),

            // P2 - existing working locator
            this.username,

            // P3
            page.locator(
                'input[name="username"]'
            ),

            // P4
            page.locator(
                'input[type="email"]'
            ),

            // P5
            page.getByLabel('Username', {
                exact: true
            })
        ];

        // ========================================================
        // PASSWORD HEALING LOCATORS
        // ========================================================

        this.PasswordLocators = [

            // P1 - intentionally wrong
            page.locator(
                'input[data-healing-test="wrong-password"]'
            ),

            // P2 - existing working locator
            this.password,

            // P3
            page.locator(
                'input[name="pw"]'
            ),

            // P4
            page.locator(
                'input[type="password"]'
            ),

            // P5
            page.getByLabel('Password', {
                exact: true
            })
        ];

        // ========================================================
        // LOGIN BUTTON HEALING LOCATORS
        // ========================================================

        this.LoginButtonLocators = [

            // P1 - intentionally wrong
            page.locator(
                'button[data-healing-test="wrong-login"]'
            ),

            // P2 - existing working locator
            this.loginButton,

            // P3
            page.locator(
                'input[type="submit"]'
            ),

            // P4
            page.getByRole('button', {
                name: 'Log In',
                exact: true
            }),

            // P5
            page.locator(
                'button:has-text("Log In")'
            )
        ];

        // ========================================================
        // PASSWORD REQUIRED ERROR HEALING
        // ========================================================

        this.PasswordRequiredErrorLocators = [

            // P1
            page.locator(
                '[data-healing-test="wrong-password-error"]'
            ),

            // P2
            this.passwordRequiredError,

            // P3
            page.getByText(
                'Error: Please enter your password.',
                { exact: true }
            ),

            // P4
            page.locator(
                '//div[contains(text(),"Please enter your password")]'
            )
        ];

        // ========================================================
        // INVALID PASSWORD ERROR HEALING
        // ========================================================

        this.InvalidPasswordErrorLocators = [

            // P1
            page.locator(
                '[data-healing-test="wrong-invalid-password-error"]'
            ),

            // P2
            this.invalidPasswordError,

            // P3
            page.getByText(
                'Error: Please check your username and password',
                { exact: false }
            ),

            // P4
            page.locator(
                '//div[contains(text(),"Please check your username and password")]'
            )
        ];

        // ========================================================
        // DEVELOPER EDITION HEALING
        // ========================================================

        this.DeveloperEditionLocators = [

            // P1
            page.locator(
                '[data-healing-test="wrong-developer-edition"]'
            ),

            // P2
            this.developerEdition,

            // P3
            page.getByText(
                'Developer Edition',
                { exact: true }
            ),

            // P4
            page.locator(
                '//span[contains(text(),"Developer Edition")]'
            )
        ];
    }

    // ============================================================
    // 1. INVALID USERNAME
    // ============================================================

    async loginWithInvalidUsername(
        username: string
    ): Promise<void> {

        await this.healFill(
            this.UsernameLocators,
            username
        );

        await this.healClick(
            this.LoginButtonLocators
        );
    }

    // ============================================================
    // 2. VALID USERNAME + INVALID PASSWORD
    //
    // Preserve the existing Salesforce login flow:
    //
    // Username
    //     ↓
    // Log In
    //     ↓
    // Password
    //     ↓
    // Log In
    // ============================================================

    async loginWithValidUsernameAndInvalidPassword(
        username: string,
        password: string
    ): Promise<void> {

        await this.healFill(
            this.UsernameLocators,
            username
        );

        await this.healClick(
            this.LoginButtonLocators
        );

        await this.healFill(
            this.PasswordLocators,
            password
        );

        await this.healClick(
            this.LoginButtonLocators
        );
    }

    // ============================================================
    // 3. VALID USERNAME + VALID PASSWORD
    // ============================================================

    async loginWithValidUsernameAndValidPassword(
    username: string,
    password: string
): Promise<void> {

    await this.username.fill(username);

    await this.loginButton.click();

    await this.password.fill(password);

    await this.loginButton.click();
}

    // ============================================================
    // PASSWORD REQUIRED ERROR
    // ============================================================

    async getPasswordRequiredError(): Promise<string> {

        const errorLocator =
            await this.getHealedLocator(
                this.PasswordRequiredErrorLocators
            );

        await expect(errorLocator).toBeVisible();

        return await errorLocator.innerText();
    }

    // ============================================================
    // INVALID PASSWORD ERROR
    // ============================================================

    async getInvalidPasswordError(): Promise<string> {

        const errorLocator =
            await this.getHealedLocator(
                this.InvalidPasswordErrorLocators
            );

        await expect(errorLocator).toBeVisible();

        return await errorLocator.innerText();
    }

    // ============================================================
    // DEVELOPER EDITION
    // ============================================================

    async getDeveloperEdition(): Promise<string> {

        const developerEditionLocator =
            await this.getHealedLocator(
                this.DeveloperEditionLocators
            );

        await expect(
            developerEditionLocator
        ).toBeVisible();

        return await developerEditionLocator.innerText();
    }
}

