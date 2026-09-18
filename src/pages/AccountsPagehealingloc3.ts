
import { Page, Locator } from '@playwright/test';
import { DropdownComponent } from '../components/DropdownComponent';
import { BasePage } from './BasePage';
import { expect } from '@playwright/test';

export class AccountsPagehealingloc3 extends BasePage {

    private readonly dropdown: DropdownComponent;

    // ============================================================
    // MAIN LOCATORS
    // These remain available for assertions.
    // ============================================================

    readonly Accounts: Locator;
    readonly New: Locator;
    readonly AccountInformation: Locator;

    readonly AccountName: Locator;
    readonly AccountNumber: Locator;
    readonly Rating: Locator;
    readonly Ownership: Locator;

    readonly BillingCountry: Locator;
    readonly BillingStreet: Locator;
    readonly BillingCity: Locator;
    readonly BillingState: Locator;
    readonly BillingPostalCode: Locator;

    readonly ShippingCountry: Locator;
    readonly ShippingStreet: Locator;
    readonly ShippingCity: Locator;
    readonly ShippingState: Locator;
    readonly ShippingPostalCode: Locator;

    readonly Phone: Locator;
    readonly Website: Locator;
    readonly Description: Locator;

    readonly Save: Locator;
    readonly Cancel: Locator;
    readonly RelatedTab: Locator;

    // ============================================================
    // LOCATOR CANDIDATES
    //
    // P1 = WRONG
    // P2 = WRONG
    // P3 = VALID MAIN LOCATOR
    // P4/P5 = additional valid fallbacks where required
    // ============================================================

    readonly AccountsLocators: Locator[];
    readonly NewLocators: Locator[];
    readonly AccountInformationLocators: Locator[];

    readonly AccountNameLocators: Locator[];
    readonly AccountNumberLocators: Locator[];
    readonly RatingLocators: Locator[];
    readonly OwnershipLocators: Locator[];

    readonly BillingCountryLocators: Locator[];
    readonly BillingStreetLocators: Locator[];
    readonly BillingCityLocators: Locator[];
    readonly BillingStateLocators: Locator[];
    readonly BillingPostalCodeLocators: Locator[];

    readonly ShippingCountryLocators: Locator[];
    readonly ShippingStreetLocators: Locator[];
    readonly ShippingCityLocators: Locator[];
    readonly ShippingStateLocators: Locator[];
    readonly ShippingPostalCodeLocators: Locator[];

    readonly PhoneLocators: Locator[];
    readonly WebsiteLocators: Locator[];
    readonly DescriptionLocators: Locator[];

    readonly SaveLocators: Locator[];
    readonly CancelLocators: Locator[];
    readonly RelatedTabLocators: Locator[];

    constructor(page: Page) {

        super(page);

        this.dropdown = new DropdownComponent(page);

        // ========================================================
        // VALID MAIN LOCATORS
        // ========================================================

        this.Accounts =
            page.locator("//a[@title='Accounts']");

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
                'button[type="button"][aria-label="Rating"][aria-haspopup="listbox"]'
            );

        this.Ownership =
            page.locator(
                'button[type="button"][aria-label="Ownership"][aria-haspopup="listbox"]'
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

        this.Phone =
            page.locator(
                'input[name="Phone"]'
            );

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

        // ========================================================
        // ACCOUNTS
        // ========================================================

        this.AccountsLocators = [

            page.locator(
                'a[data-healing-test="wrong-accounts"]'
            ),

            page.locator(
                'a[data-healing-test="wrong-accounts-2"]'
            ),

            this.Accounts
        ];

        // ========================================================
        // NEW
        // ========================================================

        this.NewLocators = [

            page.locator(
                'button[data-healing-test="wrong-new"]'
            ),

            page.locator(
                'button[data-healing-test="wrong-new-2"]'
            ),

            this.New
        ];

        // ========================================================
        // ACCOUNT INFORMATION
        // ========================================================

        this.AccountInformationLocators = [

            page.locator(
                '[data-healing-test="wrong-account-information"]'
            ),

            page.locator(
                '[data-healing-test="wrong-account-information-2"]'
            ),

            this.AccountInformation
        ];

        // ========================================================
        // ACCOUNT NAME
        // ========================================================

        this.AccountNameLocators = [

            page.locator(
                'input[data-healing-test="wrong-account-name"]'
            ),

            page.locator(
                'input[data-healing-test="wrong-account-name-2"]'
            ),

            this.AccountName
        ];

        // ========================================================
        // ACCOUNT NUMBER
        // ========================================================

        this.AccountNumberLocators = [

            page.locator(
                'input[data-healing-test="wrong-account-number"]'
            ),

            page.locator(
                'input[data-healing-test="wrong-account-number-2"]'
            ),

            this.AccountNumber
        ];

        // ========================================================
        // RATING
        // ========================================================

        this.RatingLocators = [

            page.locator(
                'button[data-healing-test="wrong-rating"]'
            ),

            page.locator(
                'button[data-healing-test="wrong-rating-2"]'
            ),

            this.Rating,

            page.getByRole('button', {
                name: 'Rating',
                exact: true
            })
        ];

        // ========================================================
        // OWNERSHIP
        // ========================================================

        this.OwnershipLocators = [

            page.locator(
                'button[data-healing-test="wrong-ownership"]'
            ),

            page.locator(
                'button[data-healing-test="wrong-ownership-2"]'
            ),

            this.Ownership,

            page.getByRole('button', {
                name: 'Ownership',
                exact: true
            })
        ];

        // ========================================================
        // BILLING COUNTRY
        // ========================================================

        this.BillingCountryLocators = [

            page.locator(
                'input[data-healing-test="wrong-billing-country"]'
            ),

            page.locator(
                'input[data-healing-test="wrong-billing-country-2"]'
            ),

            this.BillingCountry
        ];

        // ========================================================
        // BILLING STREET
        // ========================================================

        this.BillingStreetLocators = [

            page.locator(
                'input[data-healing-test="wrong-billing-street"]'
            ),

            page.locator(
                'input[data-healing-test="wrong-billing-street-2"]'
            ),

            this.BillingStreet
        ];

        // ========================================================
        // BILLING CITY
        // ========================================================

        this.BillingCityLocators = [

            page.locator(
                'input[data-healing-test="wrong-billing-city"]'
            ),

            page.locator(
                'input[data-healing-test="wrong-billing-city-2"]'
            ),

            this.BillingCity
        ];

        // ========================================================
        // BILLING STATE
        // ========================================================

        this.BillingStateLocators = [

            page.locator(
                'input[data-healing-test="wrong-billing-state"]'
            ),

            page.locator(
                'input[data-healing-test="wrong-billing-state-2"]'
            ),

            this.BillingState
        ];

        // ========================================================
        // BILLING POSTAL CODE
        // ========================================================

        this.BillingPostalCodeLocators = [

            page.locator(
                'input[data-healing-test="wrong-billing-postal"]'
            ),

            page.locator(
                'input[data-healing-test="wrong-billing-postal-2"]'
            ),

            this.BillingPostalCode
        ];

        // ========================================================
        // SHIPPING COUNTRY
        // ========================================================

        this.ShippingCountryLocators = [

            page.locator(
                'input[data-healing-test="wrong-shipping-country"]'
            ),

            page.locator(
                'input[data-healing-test="wrong-shipping-country-2"]'
            ),

            this.ShippingCountry,

            page.locator(
                'input[name="country"][role="combobox"]'
            ),

            page.locator(
                'input[autocomplete="country"][role="combobox"]'
            )
        ];

        // ========================================================
        // SHIPPING STREET
        // ========================================================

        this.ShippingStreetLocators = [

            page.locator(
                'input[data-healing-test="wrong-shipping-street"]'
            ),

            page.locator(
                'input[data-healing-test="wrong-shipping-street-2"]'
            ),

            this.ShippingStreet
        ];

        // ========================================================
        // SHIPPING CITY
        // ========================================================

        this.ShippingCityLocators = [

            page.locator(
                'input[data-healing-test="wrong-shipping-city"]'
            ),

            page.locator(
                'input[data-healing-test="wrong-shipping-city-2"]'
            ),

            this.ShippingCity
        ];

        // ========================================================
        // SHIPPING STATE
        //
        // P1 = WRONG
        // P2 = WRONG
        // P3 = VALID ACCESSIBLE LOCATOR
        // P4 = SALESFORCE DOM LOCATOR
        // P5 = SALESFORCE AUTOCOMPLETE LOCATOR
        // ========================================================

        this.ShippingStateLocators = [

            page.locator(
                'input[data-healing-test="wrong-shipping-state"]'
            ),

            page.locator(
                'input[data-healing-test="wrong-shipping-state-2"]'
            ),

            this.ShippingState,

            page.locator(
                'input[name="province"][role="combobox"]'
            ),

            page.locator(
                'input[autocomplete="address-level1"][role="combobox"]'
            )
        ];

        // ========================================================
        // SHIPPING POSTAL CODE
        // ========================================================

        this.ShippingPostalCodeLocators = [

            page.locator(
                'input[data-healing-test="wrong-shipping-postal"]'
            ),

            page.locator(
                'input[data-healing-test="wrong-shipping-postal-2"]'
            ),

            this.ShippingPostalCode
        ];

        // ========================================================
        // PHONE
        // ========================================================

        this.PhoneLocators = [

            page.locator(
                'input[data-healing-test="wrong-phone"]'
            ),

            page.locator(
                'input[data-healing-test="wrong-phone-2"]'
            ),

            this.Phone
        ];

        // ========================================================
        // WEBSITE
        // ========================================================

        this.WebsiteLocators = [

            page.locator(
                'input[data-healing-test="wrong-website"]'
            ),

            page.locator(
                'input[data-healing-test="wrong-website-2"]'
            ),

            this.Website
        ];

        // ========================================================
        // DESCRIPTION
        // ========================================================

        this.DescriptionLocators = [

            page.locator(
                'textarea[data-healing-test="wrong-description"]'
            ),

            page.locator(
                'textarea[data-healing-test="wrong-description-2"]'
            ),

            this.Description
        ];

        // ========================================================
        // SAVE
        // ========================================================

        this.SaveLocators = [

            page.locator(
                'button[data-healing-test="wrong-save"]'
            ),

            page.locator(
                'button[data-healing-test="wrong-save-2"]'
            ),

            this.Save
        ];

        // ========================================================
        // CANCEL
        // ========================================================

        this.CancelLocators = [

            page.locator(
                'button[data-healing-test="wrong-cancel"]'
            ),

            page.locator(
                'button[data-healing-test="wrong-cancel-2"]'
            ),

            this.Cancel
        ];

        // ========================================================
        // RELATED TAB
        // ========================================================

        this.RelatedTabLocators = [

            page.locator(
                '[data-healing-test="wrong-related"]'
            ),

            page.locator(
                '[data-healing-test="wrong-related-2"]'
            ),

            this.RelatedTab
        ];
    }

    // ============================================================
    // ACCOUNTS
    // ============================================================

    async clickAccounts(): Promise<void> {

        const locator =
            await this.getHealedLocator(
                this.AccountsLocators
            );

        await locator.click();
    }

    async verifyAccountsPage(): Promise<void> {

        const locator =
            await this.getHealedLocator(
                this.AccountsLocators
            );

        await locator.waitFor({
            state: 'visible'
        });
    }

    // ============================================================
    // NEW
    // ============================================================

    async clickNew(): Promise<void> {

        const locator =
            await this.getHealedLocator(
                this.NewLocators
            );

        await locator.click();
    }

    // ============================================================
    // ACCOUNT INFORMATION
    // ============================================================

    async verifyAccountInformation(): Promise<void> {

        const locator =
            await this.getHealedLocator(
                this.AccountInformationLocators
            );

        await locator.waitFor({
            state: 'visible'
        });
    }

    // ============================================================
    // ACCOUNT NAME
    // ============================================================

    async enterAccountName(
        accountName: string
    ): Promise<void> {

        await this.healFill(
            this.AccountNameLocators,
            accountName
        );
    }

    // ============================================================
    // ACCOUNT NUMBER
    // ============================================================

    async enterAccountNumber(
        accountNumber: string
    ): Promise<void> {

        await this.healFill(
            this.AccountNumberLocators,
            accountNumber
        );
    }

    // ============================================================
    // RATING
    // ============================================================

    async selectRating(
        rating: string
    ): Promise<void> {

        await this.dropdown.select(
            this.RatingLocators,
            rating
        );
    }

    // ============================================================
    // OWNERSHIP
    // ============================================================

    async selectOwnership(
        ownership: string
    ): Promise<void> {

        await this.dropdown.select(
            this.OwnershipLocators,
            ownership
        );
    }

    // ============================================================
    // BILLING COUNTRY
    // ============================================================

    async selectBillingCountry(
        country: string
    ): Promise<void> {

        await this.dropdown.select(
            this.BillingCountryLocators,
            country
        );
    }

    // ============================================================
    // BILLING STREET
    // ============================================================

    async enterBillingStreet(
        street: string
    ): Promise<void> {

        await this.healFill(
            this.BillingStreetLocators,
            street
        );
    }

    // ============================================================
    // BILLING CITY
    // ============================================================

    async enterBillingCity(
        city: string
    ): Promise<void> {

        await this.healFill(
            this.BillingCityLocators,
            city
        );
    }

    // ============================================================
    // BILLING STATE
    // ============================================================

    async selectBillingState(
        state: string
    ): Promise<void> {

        await this.dropdown.select(
            this.BillingStateLocators,
            state
        );
    }

    // ============================================================
    // BILLING POSTAL CODE
    // ============================================================

    async enterBillingPostalCode(
        postalCode: string
    ): Promise<void> {

        await this.healFill(
            this.BillingPostalCodeLocators,
            postalCode
        );
    }

    // ============================================================
    // SHIPPING COUNTRY
    // ============================================================

    async selectShippingCountry(
        country: string
    ): Promise<void> {

        await this.dropdown.select(
            this.ShippingCountryLocators,
            country
        );
    }

    // ============================================================
    // SHIPPING STREET
    // ============================================================

    async enterShippingStreet(
        street: string
    ): Promise<void> {

        await this.healFill(
            this.ShippingStreetLocators,
            street
        );
    }

    // ============================================================
    // SHIPPING CITY
    // ============================================================

    async enterShippingCity(
        city: string
    ): Promise<void> {

        await this.healFill(
            this.ShippingCityLocators,
            city
        );
    }

    // ============================================================
    // SHIPPING STATE
    // ============================================================

    async selectShippingState(
        state: string
    ): Promise<void> {

        await this.dropdown.select(
            this.ShippingStateLocators,
            state
        );
    }

    // ============================================================
    // SHIPPING POSTAL CODE
    // ============================================================

    async enterShippingPostalCode(
        postalCode: string
    ): Promise<void> {

        await this.healFill(
            this.ShippingPostalCodeLocators,
            postalCode
        );
    }

    // ============================================================
    // PHONE
    // ============================================================

    async enterPhone(
        phone: string
    ): Promise<void> {

        await this.healFill(
            this.PhoneLocators,
            phone
        );
    }

    // ============================================================
    // WEBSITE
    // ============================================================

    async enterWebsite(
        website: string
    ): Promise<void> {

        await this.healFill(
            this.WebsiteLocators,
            website
        );
    }

    // ============================================================
    // DESCRIPTION
    // ============================================================

    async enterDescription(
        description: string
    ): Promise<void> {

        await this.healFill(
            this.DescriptionLocators,
            description
        );
    }

    // ============================================================
    // SAVE
    // ============================================================

   
async clave(): Promise<void> {

    // Give Salesforce time to display the error dialog / X button
    await this.page.waitForTimeout(2000);

    // Click X / Close error dialog if it is visible
    const closeButton = this.page.locator(
        'button[title="Close error dialog"]'
    );

    if (await closeButton.isVisible({ timeout: 5000 }).catch(() => false)) {
        await expect(closeButton).toBeEnabled();
        await closeButton.click();

        // Give Salesforce time to enable the Save button
        await this.page.waitForTimeout(1000);
    }

    // Now click Save
    await expect(this.Save).toBeVisible();
    await expect(this.Save).toBeEnabled();

    await this.Save.click();
}


    // ============================================================
    // CANCEL
    // ============================================================

    async clickCancel(): Promise<void> {

        const locator =
            await this.getHealedLocator(
                this.CancelLocators
            );

        await locator.click();
    }

    // ============================================================
    // RELATED TAB
    // ============================================================

    async clickRelatedTab(): Promise<void> {

        const locator =
            await this.getHealedLocator(
                this.RelatedTabLocators
            );

        await locator.click();
    }
}

