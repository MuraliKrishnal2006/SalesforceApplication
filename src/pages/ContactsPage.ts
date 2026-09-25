
import { Page, Locator,expect } from '@playwright/test';
import { DropdownComponent } from '../components/DropdownComponent';
import { BasePage } from './BasePage';

export class ContactsPage extends BasePage {

    private readonly dropdown: DropdownComponent;

    readonly Contacts: Locator;
    readonly New: Locator;

    readonly Salutation: Locator;
    readonly FirstName: Locator;
    readonly LastName: Locator;
    readonly AccountName: Locator;
    readonly Phone: Locator;
    readonly Mobile: Locator;
    readonly Email: Locator;
    readonly Department: Locator;
    readonly Fax: Locator;
    readonly Birthdate: Locator;
    readonly LeadSource: Locator;

    readonly MailingCountry: Locator;
    readonly MailingStreet: Locator;
    readonly MailingCity: Locator;
    readonly MailingState: Locator;
    readonly MailingPostalCode: Locator;

    readonly OtherCountry: Locator;
    readonly OtherStreet: Locator;
    readonly OtherCity: Locator;
    readonly OtherState: Locator;
    readonly OtherPostalCode: Locator;

    readonly Save: Locator;
    readonly Cancel: Locator;
    readonly MyContacts: Locator;
    constructor(page: Page) {

        super(page);

        this.dropdown = new DropdownComponent(page);

        // =====================================================
        // Main Locators
        // =====================================================

        this.Contacts = page.getByRole('link', {
            name: 'Contacts',
            exact: true
        });

        this.New = page.getByRole('button', {
            name: 'New',
            exact: true
        });

        // =====================================================
        // Contact Information
        // =====================================================

        this.Salutation = page.getByRole('combobox', {
            name: 'Salutation',
            exact: true
        });

        this.FirstName = page.getByRole('textbox', {
            name: 'First Name',
            exact: true
        });

        this.LastName = page.getByRole('textbox', {
            name: 'Last Name',
            exact: true
        });

        this.AccountName = page.getByRole('combobox', {
            name: 'Account Name',
            exact: true
        });

        this.Phone = page.getByRole('textbox', {
            name: 'Phone',
            exact: true
        });

        this.Mobile = page.getByRole('textbox', {
            name: 'Mobile',
            exact: true
        });

        this.Email = page.getByRole('textbox', {
            name: 'Email',
            exact: true
        });

        this.Department = page.getByRole('textbox', {
            name: 'Department',
            exact: true
        });

        this.Fax = page.getByRole('textbox', {
            name: 'Fax',
            exact: true
        });

        this.Birthdate = page.getByRole('textbox', {
            name: 'Birthdate',
            exact: true
        });

        this.LeadSource = page.getByRole('combobox', {
            name: 'Lead Source'
        });

        // =====================================================
        // Mailing Address
        // =====================================================

        this.MailingCountry = page.getByRole('combobox', {
            name: 'Mailing Country',
            exact: true
        });

        this.MailingStreet = page.getByRole('textbox', {
            name: 'Mailing Street',
            exact: true
        });

        this.MailingCity = page.getByRole('textbox', {
            name: 'Mailing City',
            exact: true
        });

        this.MailingState = page.getByRole('combobox', {
            name: 'Mailing State',
            exact: true
        });

        this.MailingPostalCode = page.getByRole('textbox', {
            name: 'Mailing Zip/Postal Code',
            exact: true
        });

        // =====================================================
        // Other Address
        // =====================================================

        this.OtherCountry = page.getByRole('combobox', {
            name: 'Other Country',
            exact: true
        });

        this.OtherStreet = page.getByRole('textbox', {
            name: 'Other Street',
            exact: true
        });

        this.OtherCity = page.getByRole('textbox', {
            name: 'Other City',
            exact: true
        });

        this.OtherState = page.getByRole('combobox', {
            name: 'Other State',
            exact: true
        });

        this.OtherPostalCode = page.getByRole('textbox', {
            name: 'Other Zip/Postal Code',
            exact: true
        });

        // =====================================================
        // Buttons / Verification
        // =====================================================

        this.Save = page.getByRole('button', {
            name: 'Save',
            exact: true
        });

        this.Cancel = page.getByRole('button', {
            name: 'Cancel',
            exact: true
        });

       this.MyContacts = page.locator("//h1/span[text()='My Contacts']");
    }

    // =========================================================
    // Contacts Page Methods
    // =========================================================

    async clickContacts(): Promise<void> {
        await this.click(this.Contacts);
    }

   
async clickNew(): Promise<void> {
    console.log('Waiting for New button...');

    await this.New.waitFor({
        state: 'visible',
        timeout: 60000
    });

    await expect(this.New).toBeEnabled({
        timeout: 60000
    });

    console.log('New button is visible and enabled.');

    await this.click(this.New);

    console.log('New button clicked.');
}

async waitForNewContactForm(): Promise<void> {
    console.log('Waiting for New Contact form...');

    await expect.poll(
        async () => {
            const firstNameVisible = await this.FirstName.isVisible().catch(() => false);
            const lastNameVisible = await this.LastName.isVisible().catch(() => false);
            const firstNameEnabled = await this.FirstName.isEnabled().catch(() => false);
            const lastNameEnabled = await this.LastName.isEnabled().catch(() => false);
            const saveVisible = await this.Save.isVisible().catch(() => false);
            const saveEnabled = await this.Save.isEnabled().catch(() => false);

            return (
                firstNameVisible &&
                lastNameVisible &&
                firstNameEnabled &&
                lastNameEnabled &&
                saveVisible &&
                saveEnabled
            );
        },
        {
            timeout: 60000,
            intervals: [500, 1000, 2000]
        }
    );

    console.log('New Contact form confirmed.');
}

    // =========================================================
    // Salutation
    // =========================================================

    async selectSalutation(
    salutation: string
): Promise<void> {

    await this.Salutation.waitFor({
        state: 'visible',
        timeout: 30000
    });

    console.log(
        'Salutation count:',
        await this.Salutation.count()
    );

    console.log(
        'Salutation visible:',
        await this.Salutation.isVisible()
    );

    console.log(
        'Salutation enabled:',
        await this.Salutation.isEnabled()
    );

    console.log(
        'Salutation aria-expanded:',
        await this.Salutation.getAttribute(
            'aria-expanded'
        )
    );

    console.log(
        'Salutation aria-haspopup:',
        await this.Salutation.getAttribute(
            'aria-haspopup'
        )
    );

    console.log(
        'Salutation data-value:',
        await this.Salutation.getAttribute(
            'data-value'
        )
    );

    await this.dropdown.select(
        [
            // P1 - existing locator
            this.Salutation,

            // P2 - existing healing locator
            this.page.locator(
                '[role="combobox"][aria-label="Salutation"][aria-haspopup="listbox"]'
            ),

            // P3 - direct Salesforce combobox button
            this.page.locator(
                'button[role="combobox"][aria-label="Salutation"]'
            )
        ],
        salutation
    );
}

    // =========================================================
    // Contact Information
    // =========================================================

    async enterFirstName(
        firstName: string
    ): Promise<void> {

        await this.fill(
            this.FirstName,
            firstName
        );
    }

    async enterLastName(
        lastName: string
    ): Promise<void> {

        await this.fill(
            this.LastName,
            lastName
        );
    }

    async selectAccountName(
        accountName: string
    ): Promise<void> {

        await this.dropdown.select(
            [this.AccountName],
            accountName
        );
    }

    async enterPhone(
        phone: string | number
    ): Promise<void> {

        await this.fill(
            this.Phone,
            String(phone)
        );
    }

    async enterMobile(
        mobile: string | number
    ): Promise<void> {

        await this.fill(
            this.Mobile,
            String(mobile)
        );
    }

    async enterEmail(
        email: string
    ): Promise<void> {

        await this.fill(
            this.Email,
            email
        );
    }

    async enterDepartment(
        department: string
    ): Promise<void> {

        await this.fill(
            this.Department,
            department
        );
    }

    async enterFax(
        fax: string | number
    ): Promise<void> {

        await this.fill(
            this.Fax,
            String(fax)
        );
    }

    async enterBirthDate(
        birthDate: string | number
    ): Promise<void> {

        await this.fill(
            this.Birthdate,
            String(birthDate)
        );
    }

    // =========================================================
    // Lead Source
    // =========================================================

    async selectLeadSource(
        leadSource: string
    ): Promise<void> {

        await this.dropdown.select(
            [this.LeadSource],
            leadSource
        );
    }

    // =========================================================
    // Mailing Address
    // =========================================================

    async selectMailingCountry(
        mailingCountry: string
    ): Promise<void> {

        await this.dropdown.select(
            [this.MailingCountry],
            mailingCountry
        );
    }

    async enterMailingStreet(
        mailingStreet: string
    ): Promise<void> {

        await this.fill(
            this.MailingStreet,
            mailingStreet
        );
    }

    async enterMailingCity(
        mailingCity: string
    ): Promise<void> {

        await this.fill(
            this.MailingCity,
            mailingCity
        );
    }

    async selectMailingState(
        mailingState: string
    ): Promise<void> {

        await this.dropdown.select(
            [
                this.MailingState,

                this.page.locator(
                    'input[name="province"][aria-label="Mailing State/Province"]'
                ),

                this.page.locator(
                    '//input[@name="province" and @aria-label="Mailing State/Province"]'
                )
            ],
            mailingState
        );
    }

    async enterMailingPostalCode(
        mailingPostalCode: string | number
    ): Promise<void> {

        await this.fill(
            this.MailingPostalCode,
            String(mailingPostalCode)
        );
    }

    // =========================================================
    // Other Address
    // =========================================================

    async selectOtherCountry(
        otherCountry: string
    ): Promise<void> {

        await this.dropdown.select(
            [
                this.OtherCountry,

                this.page.locator(
                    'input[name="country"][aria-label="Other Country"]'
                ),

                this.page.locator(
                    'input[autocomplete="country"][name="country"][aria-label="Other Country"]'
                )
            ],
            otherCountry
        );
    }

    async enterOtherStreet(
        otherStreet: string
    ): Promise<void> {

        await this.fill(
            this.OtherStreet,
            otherStreet
        );
    }

    async enterOtherCity(
        otherCity: string
    ): Promise<void> {

        await this.fill(
            this.OtherCity,
            otherCity
        );
    }

    async selectOtherState(
        otherState: string
    ): Promise<void> {

        await this.dropdown.select(
            [
                this.OtherState,

                this.page.locator(
                    'input[aria-label="Other State/Province"]'
                ),

                this.page.locator(
                    '[role="combobox"][aria-label="Other State/Province"][aria-haspopup="listbox"]'
                )
            ],
            otherState
        );
    }

    async enterOtherPostalCode(
        otherPostalCode: string | number
    ): Promise<void> {

        await this.fill(
            this.OtherPostalCode,
            String(otherPostalCode)
        );
    }

    // =========================================================
    // Save / Cancel / Related
    // =========================================================

    async clickSave(): Promise<void> {
    await this.click(this.Save);

    await this.page.getByRole('alert').waitFor({
        state: 'visible',
        timeout: 120000
    });
}

    async clickCancel(): Promise<void> {
        await this.click(this.Cancel);
    }

   async verifyMyContacts(): Promise<void> {
    await expect(this.MyContacts).toBeVisible({
        timeout: 30000
    });
}
}

