import { Locator, Page } from "playwright";

export class AbstractPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async clickOn(locator: Locator): Promise<void> {
        await locator.click();
    }

    async isVisible(locator: Locator): Promise<boolean> {
        return await locator.isVisible();
    }
}