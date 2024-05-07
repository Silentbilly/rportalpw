import { Locator, Page } from "playwright";
import { logger } from "../../../playwright.config";

export abstract class AbstractPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async clickOn(locator: Locator): Promise<void> {
        logger.info(`'${locator}' - click`);
        await locator.click();
    }
}