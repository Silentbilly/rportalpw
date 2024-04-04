import { Locator, Page } from '@playwright/test';
import { logger } from '../../../playwright.config';

export class DashboardItemPage {

    readonly dashboardName: Locator;
    readonly deleteButton: Locator;

    constructor(page: Page) {
        this.dashboardName = page.locator("//a[text()='All Dashboards']/parent::*/following-sibling::*/span");
        this.deleteButton = page.locator("//*[text()='Delete']/ancestor::button");
    }

    async getDashboardName(): Promise<string> {
        return await this.dashboardName.innerText();
    }

    async clickOnDeleteButton(): Promise<void> {
        await this.deleteButton.click();
    }
}