
import { Page, Locator, expect } from '@playwright/test';
import { DropdownComponent } from '../components/DropdownComponent';
import { BasePage } from './BasePage';

export class AccountsPage extends BasePage {

    private readonly dropdown: DropdownComponent;

    readonly Accounts: Locator;
    readonly New: Locator;

    readonly AccountName: Locator;
    readonly AccountNumber: Locator;
    readonly Rating: Locator;
    readonly Ownership: Locator;

    readonly BillingCountry: Locator;
    readonly BillingStreet: Locator;
    readonly BillingCity: Locator;
    readonly BillingState: Locator;
    readonly BillingPostalCode: Locator;

    readonly ShippingStreet: Locator;
    readonly ShippingCity: Locator;
    readonly ShippingState: Locator;
    readonly ShippingPostalCode: Locator;
    readonly ShippingCountry: Locator;

    readonly Phone: Locator;
    readonly Website: Locator;
    readonly Description: Locator;

    readonly Save: Locator;
    readonly Cancel: Locator;

    readonly AccountInformation: Locator;
    readonly RelatedTab: Locator;

    constructor(page: Page) {

        super(page);

        this.dropdown =
            new DropdownComponent(page);

        // =====================================================
        // Main Locators
        // =====================================================

        this.Accounts =
            page.locator(
                "//a[@title='Accounts']"
            );

        this.New =
            page.getByRole('button', {
                name: 'New',
                exact: true
            });

        this.AccountInformation =
            page.getByText(
                'Account Information',
                {
                    exact: true
                }
            );

        this.AccountName =
            page.getByRole('textbox', {
                name: 'Account Name',
                exact: true
            });

        this.AccountNumber =
            page.getByLabel(
                'Account Number',
                {
                    exact: true
                }
            );

        this.Rating =
            page.locator(
                'button[aria-label="Rating"]'
            );

        this.Ownership = page.locator(
            'button[aria-label="Ownership"][aria-haspopup="listbox"]'
        );

        this.BillingCountry =
            page.getByRole(
                'combobox',
                {
                    name: 'Billing Country',
                    exact: true
                }
            );

        this.BillingStreet =
            page.getByLabel(
                'Billing Street',
                {
                    exact: true
                }
            );

        this.BillingCity =
            page.getByLabel(
                'Billing City',
                {
                    exact: true
                }
            );

        this.BillingState =
            page.getByRole(
                'combobox',
                {
                    name: 'Billing State/Province',
                    exact: true
                }
            );

        this.BillingPostalCode =
            page.getByLabel(
                'Billing Zip/Postal Code',
                {
                    exact: true
                }
            );

        this.ShippingCountry =
            page.getByRole(
                'combobox',
                {
                    name: 'Shipping Country',
                    exact: true
                }
            );

        this.ShippingStreet =
            page.getByLabel(
                'Shipping Street',
                {
                    exact: true
                }
            );

        this.ShippingCity =
            page.getByLabel(
                'Shipping City',
                {
                    exact: true
                }
            );

        this.ShippingState =
            page.getByRole(
                'combobox',
                {
                    name: 'Shipping State/Province',
                    exact: true
                }
            );

        this.ShippingPostalCode =
            page.getByLabel(
                'Shipping Zip/Postal Code',
                {
                    exact: true
                }
            );

        this.Phone = this.page.locator('input[name="Phone"]');

        this.Website =
            page.getByLabel(
                'Website',
                {
                    exact: true
                }
            );

        this.Description =
            page.getByLabel(
                'Description',
                {
                    exact: true
                }
            );

        this.Save =
            page.getByRole('button', {
                name: 'Save',
                exact: true
            });

        this.Cancel =
            page.getByRole('button', {
                name: 'Cancel',
                exact: true
            });

        this.RelatedTab =
            page.getByRole('tab', {
                name: 'Related',
                exact: true
            });
    }

    // =====================================================
    // Accounts
    // =====================================================

    async clickAccounts(): Promise<void> {
        const locator = await this.getHealedLocator([
            this.Accounts,

            this.page.getByRole('link', {
                name: 'Accounts',
                exact: true
            }),

            this.page.getByTitle('Accounts')
        ]);

        await expect(locator).toBeVisible({ timeout: 30000 });

        await expect(locator).toBeEnabled({ timeout: 30000 });

        await locator.click();
    }

    async verifyAccountsPage(): Promise<void> {

        const locator =
            await this.getHealedLocator([
                this.Accounts,

                this.page.getByRole('link', {
                    name: 'Accounts',
                    exact: true
                }),

                this.page.getByTitle(
                    'Accounts'
                )
            ]);

        await expect(locator).toBeVisible();
    }

    // =====================================================
    // New
    // =====================================================

    async clickNew(): Promise<void> {

        const locator =
            await this.getHealedLocator([
                this.New,

                this.page.getByRole('button', {
                    name: 'New',
                    exact: true
                }),

                this.page.getByText(
                    'New',
                    {
                        exact: true
                    }
                )
            ]);

        await expect(locator).toBeVisible();

        await expect(locator).toBeEnabled();

        await locator.click();
    }

    // =====================================================
    // Account Information
    // =====================================================

    async verifyAccountInformation(): Promise<void> {

        const locator =
            await this.getHealedLocator([
                this.AccountInformation,

                this.page.getByRole('heading', {
                    name: 'Account Information',
                    exact: true
                }),

                this.page.getByText(
                    'Account Information',
                    {
                        exact: true
                    }
                )
            ]);

        await expect(locator).toBeVisible();
    }

    // =====================================================
    // Account Name
    // =====================================================

    async enterAccountName(
        accountName: string
    ): Promise<void> {

        const locator =
            await this.getHealedLocator([
                this.AccountName,

                this.page.getByLabel(
                    'Account Name',
                    {
                        exact: true
                    }
                ),

                this.page.getByRole('textbox', {
                    name: 'Account Name',
                    exact: true
                })
            ]);

        await expect(locator).toBeVisible();

        await locator.fill(accountName);
    }

    // =====================================================
    // Account Number
    // =====================================================

    async enterAccountNumber(
        accountNumber: string
    ): Promise<void> {

        const locator =
            await this.getHealedLocator([
                this.AccountNumber,

                this.page.getByRole('textbox', {
                    name: 'Account Number',
                    exact: true
                }),

                this.page.getByLabel(
                    'Account Number',
                    {
                        exact: true
                    }
                )
            ]);

        await expect(locator).toBeVisible();

        await locator.fill(accountNumber);
    }

    // =====================================================
    // Rating
    // =====================================================

    async selectRating(
        rating: string
    ): Promise<void> {

        await this.dropdown.select(
            [
                this.Rating,

                this.page.getByRole(
                    'combobox',
                    {
                        name: 'Rating',
                        exact: true
                    }
                ),

                this.page.getByLabel(
                    'Rating',
                    {
                        exact: true
                    }
                )
            ],
            rating
        );
    }

    // =====================================================
    // Ownership
    // =====================================================

    async selectOwnership(ownership: string): Promise<void> {
        await this.dropdown.select(
            [
                this.Ownership,
                this.page.locator(
                    'button[aria-label="Ownership"][aria-haspopup="listbox"]'
                ),
                this.page.getByRole('button', {
                    name: 'Ownership',
                    exact: true
                }),
                this.page.getByRole('combobox', {
                    name: 'Ownership',
                    exact: true
                })
            ],
            ownership
        );
    }
    // =====================================================
    // Billing Country
    // =====================================================

    async selectBillingCountry(
        country: string
    ): Promise<void> {

        await this.dropdown.select(
            [
                this.BillingCountry,

                this.page.getByLabel(
                    'Billing Country',
                    {
                        exact: true
                    }
                ),

                this.page.getByRole(
                    'combobox',
                    {
                        name: 'Billing Country',
                        exact: true
                    }
                )
            ],
            country
        );
    }

    // =====================================================
    // Billing Street
    // =====================================================

    async enterBillingStreet(
        street: string
    ): Promise<void> {

        const locator =
            await this.getHealedLocator([
                this.BillingStreet,

                this.page.getByRole(
                    'textbox',
                    {
                        name: 'Billing Street',
                        exact: true
                    }
                ),

                this.page.getByLabel(
                    'Billing Street',
                    {
                        exact: true
                    }
                )
            ]);

        await expect(locator).toBeVisible();

        await locator.fill(street);
    }

    // =====================================================
    // Billing City
    // =====================================================

    async enterBillingCity(
        city: string
    ): Promise<void> {

        const locator =
            await this.getHealedLocator([
                this.BillingCity,

                this.page.getByRole(
                    'textbox',
                    {
                        name: 'Billing City',
                        exact: true
                    }
                ),

                this.page.getByLabel(
                    'Billing City',
                    {
                        exact: true
                    }
                )
            ]);

        await expect(locator).toBeVisible();

        await locator.fill(city);
    }

    // =====================================================
    // Billing State
    // =====================================================

    async selectBillingState(
        state: string
    ): Promise<void> {

        await this.dropdown.select(
            [
                this.BillingState,

                this.page.getByLabel(
                    'Billing State/Province',
                    {
                        exact: true
                    }
                ),

                this.page.getByRole(
                    'combobox',
                    {
                        name: 'Billing State/Province',
                        exact: true
                    }
                )
            ],
            state
        );
    }

    // =====================================================
    // Billing Postal Code
    // =====================================================

    async enterBillingPostalCode(
        postalCode: string
    ): Promise<void> {

        const locator =
            await this.getHealedLocator([
                this.BillingPostalCode,

                this.page.getByRole(
                    'textbox',
                    {
                        name: 'Billing Zip/Postal Code',
                        exact: true
                    }
                ),

                this.page.getByLabel(
                    'Billing Zip/Postal Code',
                    {
                        exact: true
                    }
                )
            ]);

        await expect(locator).toBeVisible();

        await locator.fill(postalCode);
    }

    // =====================================================
    // Shipping Country
    // =====================================================

    async selectShippingCountry(
        country: string
    ): Promise<void> {

        await this.dropdown.select(
            [
                this.ShippingCountry,

                this.page.getByLabel(
                    'Shipping Country',
                    {
                        exact: true
                    }
                ),

                this.page.getByRole(
                    'combobox',
                    {
                        name: 'Shipping Country',
                        exact: true
                    }
                )
            ],
            country
        );
    }

    // =====================================================
    // Shipping Street
    // =====================================================

    async enterShippingStreet(
        street: string
    ): Promise<void> {

        const locator =
            await this.getHealedLocator([
                this.ShippingStreet,

                this.page.getByRole(
                    'textbox',
                    {
                        name: 'Shipping Street',
                        exact: true
                    }
                ),

                this.page.getByLabel(
                    'Shipping Street',
                    {
                        exact: true
                    }
                )
            ]);

        await expect(locator).toBeVisible();

        await locator.fill(street);
    }

    // =====================================================
    // Shipping City
    // =====================================================

    async enterShippingCity(
        city: string
    ): Promise<void> {

        const locator =
            await this.getHealedLocator([
                this.ShippingCity,

                this.page.getByRole(
                    'textbox',
                    {
                        name: 'Shipping City',
                        exact: true
                    }
                ),

                this.page.getByLabel(
                    'Shipping City',
                    {
                        exact: true
                    }
                )
            ]);

        await expect(locator).toBeVisible();

        await locator.fill(city);
    }

    // =====================================================
    // Shipping State
    // =====================================================

    async selectShippingState(state: string): Promise<void> {
        await this.dropdown.select(
            [
                this.ShippingState,
                this.page.getByLabel('Shipping State/Province', {
                    exact: true
                }),
                this.page.getByRole('combobox', {
                    name: 'Shipping State/Province',
                    exact: true
                })
            ],
            state
        );
    }

    // =====================================================
    // Shipping Postal Code
    // =====================================================

    async enterShippingPostalCode(
        postalCode: string
    ): Promise<void> {

        const locator =
            await this.getHealedLocator([
                this.ShippingPostalCode,

                this.page.getByRole(
                    'textbox',
                    {
                        name: 'Shipping Zip/Postal Code',
                        exact: true
                    }
                ),

                this.page.getByLabel(
                    'Shipping Zip/Postal Code',
                    {
                        exact: true
                    }
                )
            ]);

        await expect(locator).toBeVisible();

        await locator.fill(postalCode);
    }

    // =====================================================
    // Phone
    // =====================================================


    async enterPhone(phone: string): Promise<void> {
        console.log('Waiting for Salesforce Phone field...');
        const phoneField = this.page.locator('input[name="Phone"]');
        await expect(phoneField).toHaveCount(1, { timeout: 15000 });
        await expect(phoneField).toBeVisible({ timeout: 15000 });
        await expect(phoneField).toBeEditable({ timeout: 10000 });
        await phoneField.fill(phone);
        await expect(phoneField).toHaveValue(phone);
        console.log(`Phone entered successfully: ${phone}`);
    }


    // =====================================================
    // Website
    // =====================================================

    async enterWebsite(
        website: string
    ): Promise<void> {

        const locator =
            await this.getHealedLocator([
                this.Website,

                this.page.getByRole(
                    'textbox',
                    {
                        name: 'Website',
                        exact: true
                    }
                ),

                this.page.getByLabel(
                    'Website',
                    {
                        exact: true
                    }
                )
            ]);

        await expect(locator).toBeVisible();

        await locator.fill(website);
    }

    // =====================================================
    // Description
    // =====================================================

    async enterDescription(
        description: string
    ): Promise<void> {

        const locator =
            await this.getHealedLocator([
                this.Description,

                this.page.getByRole(
                    'textbox',
                    {
                        name: 'Description',
                        exact: true
                    }
                ),

                this.page.getByLabel(
                    'Description',
                    {
                        exact: true
                    }
                )
            ]);

        await expect(locator).toBeVisible();

        await locator.fill(description);
    }

    // =====================================================
    // Save
    // =====================================================

    async clickSave(): Promise<void> {

        const locator =
            await this.getHealedLocator([
                this.Save,

                this.page.getByRole(
                    'button',
                    {
                        name: 'Save',
                        exact: true
                    }
                ),

                this.page.getByText(
                    'Save',
                    {
                        exact: true
                    }
                )
            ]);

        await expect(locator).toBeVisible();

        await expect(locator).toBeEnabled();

        await locator.click();
    }

    // =====================================================
    // Cancel
    // =====================================================

    async clickCancel(): Promise<void> {

        const locator =
            await this.getHealedLocator([
                this.Cancel,

                this.page.getByRole(
                    'button',
                    {
                        name: 'Cancel',
                        exact: true
                    }
                ),

                this.page.getByText(
                    'Cancel',
                    {
                        exact: true
                    }
                )
            ]);

        await expect(locator).toBeVisible();

        await expect(locator).toBeEnabled();

        await locator.click();
    }

    // =====================================================
    // Related Tab
    // =====================================================

    async clickRelatedTab(): Promise<void> {

        const locator =
            await this.getHealedLocator([
                this.RelatedTab,

                this.page.getByRole(
                    'tab',
                    {
                        name: 'Related',
                        exact: true
                    }
                ),

                this.page.getByText(
                    'Related',
                    {
                        exact: true
                    }
                )
            ]);

        await expect(locator).toBeVisible();

        await locator.click();
    }
}

