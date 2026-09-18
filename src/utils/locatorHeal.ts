
import { Locator } from '@playwright/test';

export async function healLocator(
    candidates: Locator[],
    timeout = 5000
): Promise<Locator> {

    const endTime = Date.now() + timeout;

    while (Date.now() < endTime) {

        for (const locator of candidates) {
            try {
                if (await locator.count() === 0) {
                    continue;
                }

                if (await locator.first().isVisible()) {
                    return locator.first();
                }
            } catch {
                // Try the next candidate
            }
        }

        await new Promise(resolve => setTimeout(resolve, 200));
    }

    throw new Error(
        `Auto-healing failed: None of the ${candidates.length} locators were visible within ${timeout}ms.`
    );
}

