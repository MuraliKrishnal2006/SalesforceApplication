
import { Locator, Page, expect } from '@playwright/test';

export class DropdownComponent {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Select a value from a Salesforce dropdown.
     *
     * Healing order:
     * P1 -> P2 -> P3 -> ...
     *
     * The first visible and usable dropdown locator is selected.
     */
    async select(
        candidates: Locator[],
        value: string
    ): Promise<void> {

        if (candidates.length === 0) {
            throw new Error(
                'Salesforce dropdown selection failed: No locator candidates were provided.'
            );
        }

        const maxAttempts = 3;
        let lastError: unknown = null;

        for (let attempt = 1; attempt <= maxAttempts; attempt++) {

            try {

                // =====================================================
                // STEP 1 - FIND DROPDOWN USING HEALING
                // =====================================================

                const dropdown = await this.findDropdown(candidates);

                await dropdown.scrollIntoViewIfNeeded();

                await expect(dropdown).toBeVisible();

                await expect(dropdown).toBeEnabled();

                // =====================================================
                // STEP 2 - OPEN DROPDOWN
                // =====================================================

                await dropdown.click();

                // =====================================================
                // STEP 3 - FIND VISIBLE LISTBOX
                // =====================================================

                const listbox = await this.findVisibleListbox();

                // =====================================================
                // STEP 4 - FIND REQUESTED OPTION
                // =====================================================

                const option = await this.findOption(
                    listbox,
                    value
                );

                // =====================================================
                // STEP 5 - CLICK REAL DOM ELEMENT
                // =====================================================

                await this.clickRealOption(option);

                return;

            } catch (error) {

                lastError = error;

                if (attempt < maxAttempts) {
                    await this.page.waitForTimeout(500);
                }
            }
        }

        const message =
            lastError instanceof Error
                ? lastError.message
                : String(lastError);

        throw new Error(
            `Unable to select Salesforce dropdown value "${value}" ` +
            `after ${maxAttempts} attempts. ` +
            `Original error: ${message}`
        );
    }

    // ================================================================
    // FIND DROPDOWN USING HEALING
    // ================================================================

    private async findDropdown(
        candidates: Locator[]
    ): Promise<Locator> {

        const timeout = 10000;
        const endTime = Date.now() + timeout;

        while (Date.now() < endTime) {

            for (let candidateIndex = 0;
                candidateIndex < candidates.length;
                candidateIndex++) {

                const candidate = candidates[candidateIndex];

                try {

                    const count = await candidate.count();

                    if (count === 0) {
                        continue;
                    }

                    for (let index = 0; index < count; index++) {

                        const element = candidate.nth(index);

                        if (await element.isVisible()) {
                            return element;
                        }
                    }

                } catch {
                    // Try next healing candidate.
                }
            }

            await this.page.waitForTimeout(200);
        }

        throw new Error(
            `Salesforce dropdown healing failed: ` +
            `None of the ${candidates.length} locator candidates ` +
            `became visible within ${timeout}ms.`
        );
    }

    // ================================================================
    // FIND VISIBLE LISTBOX
    // ================================================================

    private async findVisibleListbox(): Promise<Locator> {

        const listboxes = this.page.locator(
            '[role="listbox"]'
        );

        const timeout = 10000;
        const endTime = Date.now() + timeout;

        while (Date.now() < endTime) {

            try {

                const count = await listboxes.count();

                for (let index = 0; index < count; index++) {

                    const listbox = listboxes.nth(index);

                    if (await listbox.isVisible()) {
                        return listbox;
                    }
                }

            } catch {
                // Salesforce may be re-rendering the listbox.
            }

            await this.page.waitForTimeout(200);
        }

        throw new Error(
            'Salesforce dropdown was opened, but no visible listbox was found.'
        );
    }

    // ================================================================
    // FIND OPTION
    // ================================================================

    private async findOption(
        listbox: Locator,
        value: string
    ): Promise<Locator> {

        // ============================================================
        // STRATEGY 1
        // Standard role="option"
        // ============================================================

        const roleOptions = listbox.getByRole(
            'option',
            {
                name: value,
                exact: true
            }
        );

        const roleOptionCount = await roleOptions.count();

        for (let index = 0; index < roleOptionCount; index++) {

            const option = roleOptions.nth(index);

            if (await this.isVisible(option)) {
                return option;
            }
        }

        // ============================================================
        // STRATEGY 2
        // data-value="value"
        //
        // This is important for Salesforce dropdowns.
        // ============================================================

        const escapedValue =
            this.escapeAttribute(value);

        const dataValueOption = listbox.locator(
            `[data-value="${escapedValue}"]`
        );

        const dataValueCount =
            await dataValueOption.count();

        for (let index = 0;
            index < dataValueCount;
            index++) {

            const option =
                dataValueOption.nth(index);

            if (await this.isVisible(option)) {
                return option;
            }
        }

        // ============================================================
        // STRATEGY 3
        // Elements containing the requested text
        // ============================================================

        const textElements = listbox.getByText(
            value,
            {
                exact: true
            }
        );

        const textCount =
            await textElements.count();

        for (let index = 0;
            index < textCount;
            index++) {

            const element =
                textElements.nth(index);

            if (await this.isVisible(element)) {

                // Do not immediately return the text element.
                // Find its real clickable parent first.

                const realElement =
                    await this.findRealClickableAncestor(
                        element
                    );

                if (realElement) {
                    return realElement;
                }
            }
        }

        // ============================================================
        // STRATEGY 4
        // Salesforce option containers
        //
        // Handles cases where the visible text is generated by
        // CSS/pseudo-elements.
        // ============================================================

        const optionContainers = listbox.locator(
            '[role="option"],' +
            '[data-value],' +
            'li,' +
            'button'
        );

        const containerCount =
            await optionContainers.count();

        for (let index = 0;
            index < containerCount;
            index++) {

            const container =
                optionContainers.nth(index);

            if (!(await this.isVisible(container))) {
                continue;
            }

            // Check actual DOM text.

            const text =
                (await container.textContent() || '')
                    .trim();

            if (
                text === value ||
                text.includes(value)
            ) {
                return container;
            }

            // Check aria-label.

            const ariaLabel =
                await container.getAttribute(
                    'aria-label'
                );

            if (
                ariaLabel &&
                ariaLabel.trim() === value
            ) {
                return container;
            }

            // Check data-value.

            const dataValue =
                await container.getAttribute(
                    'data-value'
                );

            if (
                dataValue &&
                dataValue.trim() === value
            ) {
                return container;
            }
        }

        // ============================================================
        // STRATEGY 5
        // Look for an element whose accessible name matches.
        // ============================================================

        const accessibleElements =
            listbox.locator(
                'button, [role="option"], li, a'
            );

        const accessibleCount =
            await accessibleElements.count();

        for (let index = 0;
            index < accessibleCount;
            index++) {

            const element =
                accessibleElements.nth(index);

            if (!(await this.isVisible(element))) {
                continue;
            }

            try {

                const ariaLabel =
                    await element.getAttribute(
                        'aria-label'
                    );

                const title =
                    await element.getAttribute(
                        'title'
                    );

                if (
                    ariaLabel === value ||
                    title === value
                ) {
                    return element;
                }

            } catch {
                // Continue searching.
            }
        }

        throw new Error(
            `Salesforce dropdown option "${value}" was not found.`
        );
    }

    // ================================================================
    // FIND REAL CLICKABLE ANCESTOR
    // ================================================================

    private async findRealClickableAncestor(
        element: Locator
    ): Promise<Locator | null> {

        // ------------------------------------------------------------
        // 1. Direct element
        // ------------------------------------------------------------

        if (await this.isVisible(element)) {

            try {

                const tagName =
                    await element.evaluate(
                        (el) =>
                            el.tagName.toLowerCase()
                    );

                if (
                    tagName === 'button' ||
                    tagName === 'li'
                ) {
                    return element;
                }

            } catch {
                // Continue to ancestors.
            }
        }

        // ------------------------------------------------------------
        // 2. Button ancestor
        // ------------------------------------------------------------

        const button =
            element
                .locator(
                    'xpath=ancestor::button[1]'
                )
                .first();

        if (await this.isVisible(button)) {
            return button;
        }

        // ------------------------------------------------------------
        // 3. role="option" ancestor
        // ------------------------------------------------------------

        const roleOption =
            element
                .locator(
                    'xpath=ancestor::*[@role="option"][1]'
                )
                .first();

        if (await this.isVisible(roleOption)) {
            return roleOption;
        }

        // ------------------------------------------------------------
        // 4. data-value ancestor
        // ------------------------------------------------------------

        const dataValueElement =
            element
                .locator(
                    'xpath=ancestor::*[@data-value][1]'
                )
                .first();

        if (await this.isVisible(dataValueElement)) {
            return dataValueElement;
        }

        // ------------------------------------------------------------
        // 5. li ancestor
        // ------------------------------------------------------------

        const listItem =
            element
                .locator(
                    'xpath=ancestor::li[1]'
                )
                .first();

        if (await this.isVisible(listItem)) {
            return listItem;
        }

        // No usable real DOM ancestor found.

        return null;
    }

    // ================================================================
    // CLICK REAL DOM OPTION
    // ================================================================

    private async clickRealOption(
        option: Locator
    ): Promise<void> {

        // ------------------------------------------------------------
        // First try the option itself.
        // ------------------------------------------------------------

        if (await this.isVisible(option)) {

            try {

                await option.scrollIntoViewIfNeeded();

                await option.click();

                return;

            } catch {
                // Continue with ancestor search.
            }
        }

        // ------------------------------------------------------------
        // Button ancestor
        // ------------------------------------------------------------

        const button =
            option
                .locator(
                    'xpath=ancestor::button[1]'
                )
                .first();

        if (await this.isVisible(button)) {

            await button.scrollIntoViewIfNeeded();

            await expect(button).toBeEnabled();

            await button.click();

            return;
        }

        // ------------------------------------------------------------
        // role="option" ancestor
        // ------------------------------------------------------------

        const roleOption =
            option
                .locator(
                    'xpath=ancestor::*[@role="option"][1]'
                )
                .first();

        if (await this.isVisible(roleOption)) {

            await roleOption.scrollIntoViewIfNeeded();

            await roleOption.click();

            return;
        }

        // ------------------------------------------------------------
        // data-value ancestor
        // ------------------------------------------------------------

        const dataValueElement =
            option
                .locator(
                    'xpath=ancestor::*[@data-value][1]'
                )
                .first();

        if (await this.isVisible(dataValueElement)) {

            await dataValueElement.scrollIntoViewIfNeeded();

            await dataValueElement.click();

            return;
        }

        // ------------------------------------------------------------
        // li ancestor
        // ------------------------------------------------------------

        const listItem =
            option
                .locator(
                    'xpath=ancestor::li[1]'
                )
                .first();

        if (await this.isVisible(listItem)) {

            await listItem.scrollIntoViewIfNeeded();

            await listItem.click();

            return;
        }

        throw new Error(
            'Salesforce dropdown option was found, ' +
            'but its real clickable DOM element could not be identified.'
        );
    }

    // ================================================================
    // VISIBILITY CHECK
    // ================================================================

    private async isVisible(
        locator: Locator
    ): Promise<boolean> {

        try {
            return await locator.isVisible();
        } catch {
            return false;
        }
    }

    // ================================================================
    // ESCAPE CSS ATTRIBUTE VALUE
    // ================================================================

    private escapeAttribute(
        value: string
    ): string {

        return value
            .replace(/\\/g, '\\\\')
            .replace(/"/g, '\\"');
    }
}

