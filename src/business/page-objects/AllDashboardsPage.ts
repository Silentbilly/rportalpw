import { Locator, Page } from '@playwright/test';
import { PopupMessage } from '../enums/PopupMessage';

export class AllDashboardsPage {

    private readonly page: Page;
    private readonly addNewDashboardButton: Locator;
    private readonly dashboardDeletedMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addNewDashboardButton = page.locator("//*[text()='Add New Dashboard']//ancestor::button");
        this.dashboardDeletedMessage = page.getByText(PopupMessage.DASHBOARD_HAS_BEEN_DELETED);
    }

    async clickOnAddNewDashboardButton(): Promise<void> {
        await this.addNewDashboardButton.click();
    }

    async isDashboardDeletedMessageAppeared() : Promise<boolean> {
        return this.dashboardDeletedMessage.isVisible();
      }
}