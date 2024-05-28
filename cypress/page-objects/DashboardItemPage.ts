import { Locator, Page } from '@playwright/test';
import { AbstractPage } from './AbstractPage';

export class DashboardItemPage extends AbstractPage {

    readonly dashboardName: Locator;
    readonly deleteButton: Locator;

    constructor() {
        super();
        this.dashboardName = page.locator("//a[text()='All Dashboards']/parent::*/following-sibling::*/span");
        this.deleteButton = page.locator("//*[text()='Delete']/ancestor::button");
    }

    async getDashboardName(): Promise<string> {
        return await this.dashboardName.innerText();
    }
}