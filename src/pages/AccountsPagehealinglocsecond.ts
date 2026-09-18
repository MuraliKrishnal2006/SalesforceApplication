import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { DropdownComponent } from '../components/DropdownComponent';

export class AccountsPagehealingloc3 extends BasePage {

    readonly dropdown: DropdownComponent;

    // ============================================================
    // MAIN LOCATORS
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
    // HEALING LOCATORS
    //
    // P1 = intentionally WRONG
    // P2 = existing WORKING locator
    // P3/P4/P5 = additional fallbacks
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

    // ============================================================
    // CONSTRUCTOR
    // ============================================================

    constructor(page: Page) {

        super(page);

        this.dropdown = new DropdownComponent(page);

        // ========================================================
        // MAIN LOCATORS
        // ========================================================

        this.Accounts =
            page.locator("//a[@title='Accounts']");

        this.New =
            page.getByRole('button', {
                name: 'New',
                exact: true
            });

        this.AccountInformation =
            page.getByText('Account Information', {
                exact: true
            });

        this.AccountName =
            page.getByRole('textbox', {
                name: 'Account Name',
                exact: true
            });

        this.AccountNumber =
            page.getByLabel('Account Number', {
                exact: true
            });

        this.Rating =
            page.locator(
                'button[type="button"][aria-label="Rating"][aria-haspopup="listbox"]'
            );

        this.Ownership =
            page.locator('button[type="button"][aria-label="Ownership"][aria-haspopup="listbox"]');

        this.BillingCountry =
            page.getByRole('combobox', {
                name: 'Billing Country',
                exact: true
            });

        this.BillingStreet =
            page.getByLabel('Billing Street', {
                exact: true
            });

        this.BillingCity =
            page.getByLabel('Billing City', {
                exact: true
            });

        this.BillingState =
            page.getByRole('combobox', {
                name: 'Billing State/Province',
                exact: true
            });

        this.BillingPostalCode =
            page.getByLabel('Billing Zip/Postal Code', {
                exact: true
            });

        // ========================================================
        // SHIPPING COUNTRY
        // ========================================================

        this.ShippingCountry =
            page.getByRole('combobox', {
                name: 'Shipping Country',
                exact: true
            });

        this.ShippingStreet =
            page.getByLabel('Shipping Street', {
                exact: true
            });

        this.ShippingCity =
            page.getByLabel('Shipping City', {
                exact: true
            });

        this.ShippingState = page.locator(
            '[role="combobox"][aria-label="Shipping State/Province"]');

        this.ShippingPostalCode =
            page.getByLabel('Shipping Zip/Postal Code', {
                exact: true
            });

        this.Phone =
            page.locator('input[name="Phone"]');

        this.Website =
            page.getByLabel('Website', {
                exact: true
            });

        this.Description =
            page.getByLabel('Description', {
                exact: true
            });

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
        // PRIORITY 2 HEALING TEST
        // ========================================================

        // --------------------------------------------------------
        // ACCOUNTS
        // --------------------------------------------------------

        this.AccountsLocators = [
            page.locator(
                'a[data-healing-test="wrong-accounts"]'
            ),                                      // P1 WRONG

            this.Accounts,                          // P2 WORKING

            page.getByRole('link', {
                name: 'Accounts',
                exact: true
            })                                      // P3
        ];

        // --------------------------------------------------------
        // NEW
        // --------------------------------------------------------

        this.NewLocators = [
            page.locator(
                'button[data-healing-test="wrong-new"]'
            ),                                      // P1 WRONG

            this.New,                               // P2 WORKING

            page.getByText('New', {
                exact: true
            })                                      // P3
        ];

        // --------------------------------------------------------
        // ACCOUNT INFORMATION
        // --------------------------------------------------------

        this.AccountInformationLocators = [
            page.locator(
                '[data-healing-test="wrong-account-info"]'
            ),                                      // P1 WRONG

            this.AccountInformation,                // P2 WORKING

            page.getByRole('heading', {
                name: 'Account Information',
                exact: true
            })                                      // P3
        ];

        // --------------------------------------------------------
        // ACCOUNT NAME
        // --------------------------------------------------------

        this.AccountNameLocators = [
            page.locator(
                'input[data-healing-test="wrong-account-name"]'
            ),                                      // P1 WRONG

            this.AccountName,                       // P2 WORKING

            page.getByLabel('Account Name', {
                exact: true
            })                                      // P3
        ];

        // --------------------------------------------------------
        // ACCOUNT NUMBER
        // --------------------------------------------------------

        this.AccountNumberLocators = [
            page.locator(
                'input[data-healing-test="wrong-account-number"]'
            ),                                      // P1 WRONG

            this.AccountNumber,                     // P2 WORKING

            page.getByRole('textbox', {
                name: 'Account Number',
                exact: true
            })                                      // P3
        ];

        // --------------------------------------------------------
        // RATING
        // --------------------------------------------------------

        this.RatingLocators = [
            page.locator(
                'button[data-healing-test="wrong-rating"]'
            ),                                      // P1 WRONG

            this.Rating,                            // P2 WORKING

            page.locator(
                'button[type="button"][aria-label="Rating"][aria-haspopup="listbox"]'
            ),                                      // P3

            page.getByRole('button', {
                name: 'Rating',
                exact: true
            })                                      // P4
        ];

        // --------------------------------------------------------
        // OWNERSHIP
        // --------------------------------------------------------

        this.OwnershipLocators = [
            page.locator(
                'button[data-healing-test="wrong-ownership"]'
            ),                                      // P1 WRONG

            this.Ownership,                         // P2 WORKING

            page.locator(
                'button[type="button"][aria-label="Ownership"][aria-haspopup="listbox"]'
            ),                                      // P3

            page.getByRole('button', {
                name: 'Ownership',
                exact: true
            }),                                     // P4

            page.locator(
                'button[aria-label="Ownership"]'
            )                                       // P5
        ];

        // --------------------------------------------------------
        // BILLING COUNTRY
        // --------------------------------------------------------

        this.BillingCountryLocators = [
            page.locator(
                'input[data-healing-test="wrong-billing-country"]'
            ),                                      // P1 WRONG

            this.BillingCountry,                    // P2 WORKING

            page.getByLabel('Billing Country', {
                exact: true
            }),                                     // P3

            page.getByRole('combobox', {
                name: 'Billing Country',
                exact: true
            })                                      // P4
        ];

        // --------------------------------------------------------
        // BILLING STREET
        // --------------------------------------------------------

        this.BillingStreetLocators = [
            page.locator(
                'input[data-healing-test="wrong-billing-street"]'
            ),                                      // P1 WRONG

            this.BillingStreet,                     // P2 WORKING

            page.getByRole('textbox', {
                name: 'Billing Street',
                exact: true
            })                                      // P3
        ];

        // --------------------------------------------------------
        // BILLING CITY
        // --------------------------------------------------------

        this.BillingCityLocators = [
            page.locator(
                'input[data-healing-test="wrong-billing-city"]'
            ),                                      // P1 WRONG

            this.BillingCity,                       // P2 WORKING

            page.getByRole('textbox', {
                name: 'Billing City',
                exact: true
            })                                      // P3
        ];

        // --------------------------------------------------------
        // BILLING STATE
        // --------------------------------------------------------

        this.BillingStateLocators = [
            page.locator(
                'input[data-healing-test="wrong-billing-state"]'
            ),                                      // P1 WRONG

            this.BillingState,                      // P2 WORKING

            page.getByRole('combobox', {
                name: 'Billing State/Province',
                exact: true
            })                                      // P3
        ];

        // --------------------------------------------------------
        // BILLING POSTAL CODE
        // --------------------------------------------------------

        this.BillingPostalCodeLocators = [
            page.locator(
                'input[data-healing-test="wrong-billing-postal"]'
            ),                                      // P1 WRONG

            this.BillingPostalCode,                 // P2 WORKING

            page.getByRole('textbox', {
                name: 'Billing Zip/Postal Code',
                exact: true
            })                                      // P3
        ];

        // ========================================================
        // SHIPPING COUNTRY
        // ========================================================

        this.ShippingCountryLocators = [
            page.locator(
                'input[data-healing-test="wrong-shipping-country"]'
            ),                                      // P1 WRONG

            this.ShippingCountry,                   // P2 EXISTING LOCATOR

            page.locator(
                'input[aria-label="Shipping Country"]'
            ),                                      // P3

            page.locator(
                'input[placeholder="Search Country..."]'
            ),                                      // P4

            page.getByLabel('Shipping Country', {
                exact: true
            })                                      // P5
        ];

        // --------------------------------------------------------
        // SHIPPING STREET
        // --------------------------------------------------------

        this.ShippingStreetLocators = [
            page.locator(
                'input[data-healing-test="wrong-shipping-street"]'
            ),                                      // P1 WRONG

            this.ShippingStreet,                    // P2 WORKING

            page.getByRole('textbox', {
                name: 'Shipping Street',
                exact: true
            })                                      // P3
        ];

        // --------------------------------------------------------
        // SHIPPING CITY
        // --------------------------------------------------------

        this.ShippingCityLocators = [
            page.locator(
                'input[data-healing-test="wrong-shipping-city"]'
            ),                                      // P1 WRONG

            this.ShippingCity,                      // P2 WORKING

            page.getByRole('textbox', {
                name: 'Shipping City',
                exact: true
            })                                      // P3
        ];

        // --------------------------------------------------------
        // SHIPPING STATE
        // --------------------------------------------------------

        this.ShippingStateLocators = [
            page.locator(
                'input[data-healing-test="wrong-shipping-state"]'
            ),                                      // P1 WRONG

            this.ShippingState,                     // P2 WORKING

            page.locator(
                '[role="combobox"][aria-label="Shipping State/Province"]'
            ),                                      // P3

            page.locator(
                'input[aria-label="Shipping State/Province"]'
            ),                                      // P4

            page.getByLabel(
                'Shipping State/Province',
                { exact: true }
            )                                       // P5
        ];

        // --------------------------------------------------------
        // SHIPPING POSTAL CODE
        // --------------------------------------------------------

        this.ShippingPostalCodeLocators = [
            page.locator(
                'input[data-healing-test="wrong-shipping-postal"]'
            ),                                      // P1 WRONG

            this.ShippingPostalCode,                // P2 WORKING

            page.getByRole('textbox', {
                name: 'Shipping Zip/Postal Code',
                exact: true
            })                                      // P3
        ];

        // --------------------------------------------------------
        // PHONE
        // --------------------------------------------------------

        this.PhoneLocators = [
            page.locator(
                'input[data-healing-test="wrong-phone"]'
            ),                                      // P1 WRONG

            this.Phone,                             // P2 WORKING

            page.getByLabel('Phone', {
                exact: true
            }),                                     // P3

            page.getByRole('textbox', {
                name: 'Phone',
                exact: true
            })                                      // P4
        ];

        // --------------------------------------------------------
        // WEBSITE
        // --------------------------------------------------------

        this.WebsiteLocators = [
            page.locator(
                'input[data-healing-test="wrong-website"]'
            ),                                      // P1 WRONG

            this.Website,                           // P2 WORKING

            page.getByRole('textbox', {
                name: 'Website',
                exact: true
            })                                      // P3
        ];

        // --------------------------------------------------------
        // DESCRIPTION
        // --------------------------------------------------------

        this.DescriptionLocators = [
            page.locator(
                'textarea[data-healing-test="wrong-description"]'
            ),                                      // P1 WRONG

            this.Description,                       // P2 WORKING

            page.getByRole('textbox', {
                name: 'Description',
                exact: true
            })                                      // P3
        ];

        // --------------------------------------------------------
        // SAVE
        // --------------------------------------------------------

        this.SaveLocators = [
            page.locator(
                'button[data-healing-test="wrong-save"]'
            ),                                      // P1 WRONG

            this.Save,                              // P2 WORKING

            page.getByText('Save', {
                exact: true
            })                                      // P3
        ];

        // --------------------------------------------------------
        // CANCEL
        // --------------------------------------------------------

        this.CancelLocators = [
            page.locator(
                'button[data-healing-test="wrong-cancel"]'
            ),                                      // P1 WRONG

            this.Cancel,                            // P2 WORKING

            page.getByText('Cancel', {
                exact: true
            })                                      // P3
        ];

        // --------------------------------------------------------
        // RELATED TAB
        // --------------------------------------------------------

        this.RelatedTabLocators = [
            page.locator(
                '[data-healing-test="wrong-related"]'
            ),                                      // P1 WRONG

            this.RelatedTab,                        // P2 WORKING

            page.getByText('Related', {
                exact: true
            })                                      // P3
        ];
    }

    // ============================================================
    // ACTION METHODS
    // ============================================================

    async clickAccounts(): Promise<void> {
        await this.healClick(
            this.AccountsLocators
        );
    }

    async clickNew(): Promise<void> {
        await this.healClick(
            this.NewLocators
        );
    }

    async enterAccountName(
        accountName: string
    ): Promise<void> {

        await this.healFill(
            this.AccountNameLocators,
            accountName
        );
    }

    async enterAccountNumber(
        accountNumber: string
    ): Promise<void> {

        await this.healFill(
            this.AccountNumberLocators,
            accountNumber
        );
    }

    async selectRating(
        rating: string
    ): Promise<void> {

        await this.dropdown.select(
            this.RatingLocators,
            rating
        );
    }

    async selectOwnership(
        ownership: string
    ): Promise<void> {

        await this.dropdown.select(
            this.OwnershipLocators,
            ownership
        );
    }

    async selectBillingCountry(
        country: string
    ): Promise<void> {

        await this.dropdown.select(
            this.BillingCountryLocators,
            country
        );
    }

    async enterBillingStreet(
        street: string
    ): Promise<void> {

        await this.healFill(
            this.BillingStreetLocators,
            street
        );
    }

    async enterBillingCity(
        city: string
    ): Promise<void> {

        await this.healFill(
            this.BillingCityLocators,
            city
        );
    }

    async selectBillingState(
        state: string
    ): Promise<void> {

        await this.dropdown.select(
            this.BillingStateLocators,
            state
        );
    }

    async enterBillingPostalCode(
        postalCode: string
    ): Promise<void> {

        await this.healFill(
            this.BillingPostalCodeLocators,
            postalCode
        );
    }

    async selectShippingCountry(
        country: string
    ): Promise<void> {

        await this.dropdown.select(
            this.ShippingCountryLocators,
            country
        );
    }

    async enterShippingStreet(
        street: string
    ): Promise<void> {

        await this.healFill(
            this.ShippingStreetLocators,
            street
        );
    }

    async enterShippingCity(
        city: string
    ): Promise<void> {

        await this.healFill(
            this.ShippingCityLocators,
            city
        );
    }

    async selectShippingState(
        state: string
    ): Promise<void> {

        await this.dropdown.select(
            this.ShippingStateLocators,
            state
        );
    }

    async enterShippingPostalCode(
        postalCode: string
    ): Promise<void> {

        await this.healFill(
            this.ShippingPostalCodeLocators,
            postalCode
        );
    }

    async enterPhone(
        phone: string
    ): Promise<void> {

        await this.healFill(
            this.PhoneLocators,
            phone
        );
    }

    async enterWebsite(
        website: string
    ): Promise<void> {

        await this.healFill(
            this.WebsiteLocators,
            website
        );
    }

    async enterDescription(
        description: string
    ): Promise<void> {

        await this.healFill(
            this.DescriptionLocators,
            description
        );
    }

    async clickSave(): Promise<void> {

        await this.healClick(
            this.SaveLocators
        );
    }

    async clickCancel(): Promise<void> {

        await this.healClick(
            this.CancelLocators
        );
    }

    async clickRelatedTab(): Promise<void> {

        await this.healClick(
            this.RelatedTabLocators
        );
    }
}