import { Page, Locator, expect } from '@playwright/test';
import { healLocator } from '../utils/locatorHeal';

/**
 * BasePage — shared foundation for every Page Object in the framework.
 * All page classes extend this instead of duplicating common Playwright
 * actions.
 */
export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // ============================================================
    // Navigation
    // ============================================================

    async goto(path: string = '/'): Promise<void> {
        await this.page.goto(path);
    }

    // ============================================================
    // Standard Wait
    // ============================================================

    async waitForElement(locator: Locator): Promise<void> {
        await locator.waitFor({
            state: 'visible'
        });
    }

    // ============================================================
    // Standard Fill
    // ============================================================

    async fill(
        locator: Locator,
        value: string
    ): Promise<void> {

        await this.waitForElement(locator);

        await locator.fill(value);
    }

    // ============================================================
    // Standard Click
    // ============================================================

    async click(locator: Locator): Promise<void> {

        await locator.waitFor({
            state: 'visible'
        });

        await locator.scrollIntoViewIfNeeded();

        await expect(locator).toBeEnabled();

        await locator.click();
    }

    // ============================================================
    // Get Text
    // ============================================================

    async getText(locator: Locator): Promise<string> {

        await this.waitForElement(locator);

        return (
            await locator.textContent()
        )?.trim() ?? '';
    }

    // ============================================================
    // AUTO-HEALING CLICK
    // ============================================================

    async healClick(
        candidates: Locator[]
    ): Promise<void> {

        const locator =
            await this.getHealedLocator(candidates);

        await locator.waitFor({
            state: 'visible'
        });

        await locator.scrollIntoViewIfNeeded();

        await expect(locator).toBeEnabled();

        await locator.click();
    }

    // ============================================================
    // AUTO-HEALING FILL
    // ============================================================

    async healFill(
        candidates: Locator[],
        value: string
    ): Promise<void> {

        const locator =
            await this.getHealedLocator(candidates);

        await locator.waitFor({
            state: 'visible'
        });

        await locator.fill(value);
    }

    // ============================================================
    // AUTO-HEALING TEXT
    // ============================================================

    async healGetText(
        candidates: Locator[]
    ): Promise<string> {

        const locator =
            await this.getHealedLocator(candidates);

        await locator.waitFor({
            state: 'visible'
        });

        return (
            await locator.textContent()
        )?.trim() ?? '';
    }

    // ============================================================
    // AUTO-HEALING LOCATOR
    // ============================================================

    async getHealedLocator(
        candidates: Locator[]
    ): Promise<Locator> {

        /*
         * Salesforce Lightning can take some time to render
         * the next field after a dropdown selection.
         *
         * Retry the healing operation for up to 8 seconds.
         */

        const endTime =
            Date.now() + 8000;

        let lastError: unknown = null;

        while (Date.now() < endTime) {

            // ----------------------------------------------------
            // Stop if page is closed
            // ----------------------------------------------------

            if (this.page.isClosed()) {

                throw new Error(
                    'Cannot find healed locator because the page is closed.'
                );
            }

            try {

                // ------------------------------------------------
                // Call existing healing utility
                // ------------------------------------------------

                const locator =
                    await healLocator(candidates);

                // ------------------------------------------------
                // Make sure locator is still visible
                // ------------------------------------------------

                if (await locator.isVisible()) {
                    return locator;
                }

            } catch (error) {

                lastError = error;
            }

            // ----------------------------------------------------
            // Give Salesforce time to finish rendering
            // ----------------------------------------------------

            try {

                await this.page.waitForTimeout(300);

            } catch {

                if (this.page.isClosed()) {

                    throw new Error(
                        'Cannot find healed locator because the page is closed.'
                    );
                }
            }
        }

        // ========================================================
        // Healing failed
        // ========================================================

        let errorMessage =
            'Unable to find a visible healed locator after 8 seconds.';

        if (lastError instanceof Error) {
            errorMessage +=
                ` Last error: ${lastError.message}`;
        }

        throw new Error(errorMessage);
    }
}